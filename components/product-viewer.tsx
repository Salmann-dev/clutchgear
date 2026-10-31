"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  Bounds,
  useBounds,
  Environment,
  ContactShadows,
  useProgress,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { RotateCcw, ZoomIn, ZoomOut, ShieldAlert, RefreshCw, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfiguratorState } from "./configurator/configurator-types";

export interface ModelTelemetryDetails {
  nodes: string[];
  meshes: string[];
  materials: string[];
  textures: string[];
}

export interface ProductViewerProps {
  modelUrl: string;
  className?: string;
  config?: ConfiguratorState;
  onModelLogged?: (details: ModelTelemetryDetails) => void;
}

interface ControlsAPI {
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Checks if WebGL is supported by the client browser environment.
 */
function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Error Boundary to catch Three.js or WebGL rendering crashes.
 */
interface WebGLErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  constructor(props: WebGLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      "[ClutchGear 3D Viewer] WebGL Context or Render Error encountered:",
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Static Fallback Panel shown when WebGL is unsupported or context is lost.
 */
function StaticFallbackPanel({
  message = "WebGL hardware acceleration is unavailable or the graphics context was lost.",
}: {
  message?: string;
}) {
  return (
    <div className="w-full h-full min-h-[420px] flex flex-col items-center justify-center p-8 bg-surface-1 border border-white/10 rounded-xl text-center select-none">
      <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-center mb-4 text-accent shadow-inner">
        <ShieldAlert className="w-7 h-7" />
      </div>
      <span className="text-xs font-heading font-bold uppercase tracking-widest text-accent mb-1">
        HARDWARE ACCELERATION REQUIRED
      </span>
      <h4 className="text-lg font-heading font-bold text-text-primary">
        3D Viewport Offline
      </h4>
      <p className="text-xs text-text-secondary max-w-sm mt-2 font-body leading-relaxed">
        {message}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 text-xs font-heading font-bold text-text-primary border border-white/10 hover:border-accent/50 hover:text-accent transition-colors cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>RELOAD VIEWPORT</span>
      </button>
    </div>
  );
}

/**
 * Circular progress loader displaying buffering percentage in accent green.
 */
function ViewerLoader() {
  const { progress, active } = useProgress();

  if (!active && progress >= 100) return null;

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * Math.min(progress, 100)) / 100;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-void/90 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#A3FF12"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-heading font-black text-base text-accent tracking-tighter">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] font-heading font-bold text-text-muted uppercase tracking-widest animate-pulse">
        <Box className="w-3.5 h-3.5 text-accent" />
        <span>LOADING 3D GEOMETRY</span>
      </div>
    </div>
  );
}

/**
 * Model component loading Draco-compressed GLB, logging hierarchy, and applying custom shader patch.
 */
function ModelMesh({
  url,
  onModelLogged,
  config,
  prefersReducedMotion,
}: {
  url: string;
  onModelLogged?: (details: ModelTelemetryDetails) => void;
  config?: ConfiguratorState;
  prefersReducedMotion?: boolean;
}) {
  const { scene } = useGLTF(url, "/draco/");
  const loggedRef = React.useRef(false);
  const materialRef = React.useRef<THREE.MeshStandardMaterial | null>(null);

  // Persistent custom uniforms for the patched shader
  const uniformsRef = React.useRef({
    uAccentColor: { value: new THREE.Color("#A3FF12") },
    uIsOriginal: { value: 0.0 },
    uEmissiveStrength: { value: 0.22 },
  });

  // Attach onBeforeCompile shader customization once on load
  React.useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;

        if (mat && !mat.userData.clutchPatched) {
          mat.userData.clutchPatched = true;
          materialRef.current = mat;

          // Note 3: customProgramCacheKey ensures shader compiles once and is cached correctly
          mat.customProgramCacheKey = () => "clutchgear-accent-patch-v1";

          mat.onBeforeCompile = (shader) => {
            // Bind uniforms
            shader.uniforms.uAccentColor = uniformsRef.current.uAccentColor;
            shader.uniforms.uIsOriginal = uniformsRef.current.uIsOriginal;
            shader.uniforms.uEmissiveStrength = uniformsRef.current.uEmissiveStrength;

            // Inject uniform declarations into fragment shader header
            shader.fragmentShader = `
              uniform vec3 uAccentColor;
              uniform float uIsOriginal;
              uniform float uEmissiveStrength;
              ${shader.fragmentShader}
            `;

            // Patch diffuse sampling in map_fragment with blue accent detection and tuned recoloring
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <map_fragment>",
              `
              #ifdef USE_MAP
                vec4 sampledDiffuseColor = texture2D( map, vMapUv );
                #ifdef DECODE_VIDEO_TEXTURE
                  sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb + vec3( 0.055 ), vec3( 2.4 ) ) * ( 1.0 / 1.055 ), sampledDiffuseColor.rgb * ( 1.0 / 12.92 ), lessThan( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ), sampledDiffuseColor.a );
                #endif

                // Note 1: Detect blue accent pixels in linear color space.
                // In linear space, blue channel is dominant over max(red, green) by >= 0.018.
                float blueDiff = sampledDiffuseColor.b - max(sampledDiffuseColor.r, sampledDiffuseColor.g);
                float blueMask = smoothstep(0.018, 0.055, blueDiff) * step(0.02, sampledDiffuseColor.b);

                // Note 2: Preserve original texture detail and shadows while normalizing brightness
                // across Acid Green, White, and Red swatches so none are blown out or muddy.
                float lum = dot(sampledDiffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
                float detail = clamp(lum / 0.065, 0.35, 2.4);

                // Tuned balanced brightness curve
                vec3 recoloredAccent = uAccentColor * (0.82 + 0.38 * (detail - 1.0));

                // If Original Blue is active, keep original texture
                vec3 targetAccent = mix(recoloredAccent, sampledDiffuseColor.rgb, uIsOriginal);

                // Blend recolored accent strictly over blue accent pixels
                sampledDiffuseColor.rgb = mix(sampledDiffuseColor.rgb, targetAccent, blueMask);

                diffuseColor *= sampledDiffuseColor;
              #endif
              `
            );

            // Patch emissivemap_fragment to add gentle luminescence strictly to the accent areas
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <emissivemap_fragment>",
              `
              #include <emissivemap_fragment>
              vec3 activeGlow = mix(uAccentColor, vec3(0.0, 0.55, 1.0), uIsOriginal);
              totalEmissiveRadiance += activeGlow * (blueMask * uEmissiveStrength);
              `
            );
          };

          mat.needsUpdate = true;
        }
      }
    });

    if (loggedRef.current) return;
    loggedRef.current = true;

    const nodesList: string[] = [];
    const meshesList: string[] = [];
    const materialsList: string[] = [];
    const texturesList: string[] = [];

    console.group(
      "%c[ClutchGear 3D Viewer] Telemetry: Inspecting Model Scene Graph",
      "color: #A3FF12; font-weight: bold; font-size: 13px;"
    );
    console.log("Model Resource URL:", url);

    scene.traverse((child) => {
      nodesList.push(child.name || child.type);

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        meshesList.push(mesh.name || "Unnamed Mesh");

        console.log(
          `%cMesh Node: %c"${mesh.name}"`,
          "color: #A3FF12; font-weight: bold;",
          "color: #F8FAFC;",
          {
            type: mesh.type,
            geometryName: mesh.geometry?.name || "Unnamed Geometry",
            vertexCount: mesh.geometry?.attributes?.position?.count || 0,
            hasNormals: Boolean(mesh.geometry?.attributes?.normal),
            hasTangents: Boolean(mesh.geometry?.attributes?.tangent),
            hasUVs: Boolean(mesh.geometry?.attributes?.uv),
          }
        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        mats.forEach((mat) => {
          if (mat) {
            materialsList.push(mat.name || "Unnamed Material");
            const stdMat = mat as THREE.MeshStandardMaterial;

            console.log(
              `%c  Material: %c"${mat.name}" (%c${mat.type}%c)`,
              "color: #38BDF8;",
              "color: #F8FAFC; font-weight: bold;",
              "color: #A3FF12;",
              "color: #F8FAFC;",
              {
                roughness: stdMat.roughness,
                metalness: stdMat.metalness,
                color: stdMat.color?.getHexString(),
              }
            );

            if (stdMat.map) {
              const texName = stdMat.map.name || "baseColorTexture";
              texturesList.push(`Base Color Map: ${texName}`);
            }
            if (stdMat.normalMap) {
              const texName = stdMat.normalMap.name || "normalTexture";
              texturesList.push(`Normal Map: ${texName}`);
            }
            if (stdMat.metalnessMap) {
              const texName = stdMat.metalnessMap.name || "metallicRoughnessTexture";
              texturesList.push(`Metallic Map: ${texName}`);
            }
            if (stdMat.roughnessMap && stdMat.roughnessMap !== stdMat.metalnessMap) {
              const texName = stdMat.roughnessMap.name || "roughnessTexture";
              texturesList.push(`Roughness Map: ${texName}`);
            }
          }
        });
      }
    });

    const uniqueNodes = Array.from(new Set(nodesList));
    const uniqueMeshes = Array.from(new Set(meshesList));
    const uniqueMaterials = Array.from(new Set(materialsList));
    const uniqueTextures = Array.from(new Set(texturesList));

    console.log(
      "%c[ClutchGear Model Graph Breakdown]",
      "color: #A3FF12; font-weight: bold;",
      {
        nodes: uniqueNodes,
        meshes: uniqueMeshes,
        materials: uniqueMaterials,
        textures: uniqueTextures,
      }
    );
    console.groupEnd();

    onModelLogged?.({
      nodes: uniqueNodes,
      meshes: uniqueMeshes,
      materials: uniqueMaterials,
      textures: uniqueTextures,
    });
  }, [scene, url, onModelLogged]);

  // Persistent scratch color for frame calculations (zero garbage collection)
  const targetColor = React.useMemo(() => new THREE.Color(), []);

  // Frame loop: smooth ~300ms delta lerp and RGB cycling with zero material cloning
  useFrame((state, delta) => {
    let targetEmissive = 0.22;
    let targetIsOriginal = 0.0;

    if (config?.rgbEnabled) {
      if (prefersReducedMotion) {
        // Respect prefers-reduced-motion: freeze to static high-contrast hue
        targetColor.set("#A3FF12");
      } else {
        const hue = (state.clock.elapsedTime * 0.15) % 1.0;
        targetColor.setHSL(hue, 0.95, 0.55);
      }
      targetEmissive = 0.85;
      targetIsOriginal = 0.0;
    } else {
      targetColor.set(config?.accentHex || "#A3FF12");
      targetEmissive = 0.22;
      targetIsOriginal = config?.isOriginal ? 1.0 : 0.0;
    }

    // 1 - exp(-10 * delta) gives ~95% convergence in 300ms
    const lerpFactor = 1 - Math.exp(-10 * Math.min(delta, 0.1));

    uniformsRef.current.uAccentColor.value.lerp(targetColor, lerpFactor);
    uniformsRef.current.uEmissiveStrength.value = THREE.MathUtils.lerp(
      uniformsRef.current.uEmissiveStrength.value,
      targetEmissive,
      lerpFactor
    );
    uniformsRef.current.uIsOriginal.value = THREE.MathUtils.lerp(
      uniformsRef.current.uIsOriginal.value,
      targetIsOriginal,
      lerpFactor
    );

    // Smooth tactile finish interpolation (roughness & environment reflection)
    if (materialRef.current) {
      const targetRoughness = config?.finish === "glossy" ? 0.22 : 0.85;
      const targetEnv = config?.finish === "glossy" ? 1.6 : 0.5;

      materialRef.current.roughness = THREE.MathUtils.lerp(
        materialRef.current.roughness,
        targetRoughness,
        lerpFactor
      );
      materialRef.current.envMapIntensity = THREE.MathUtils.lerp(
        materialRef.current.envMapIntensity,
        targetEnv,
        lerpFactor
      );
    }
  });

  return <primitive object={scene} />;
}

/**
 * Controller child inside <Bounds> that accesses useBounds() and exposes reset and zoom APIs.
 */
function BoundsController({
  setControlsApi,
  controlsRef,
}: {
  setControlsApi: (api: ControlsAPI) => void;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const bounds = useBounds();
  const { camera } = useThree();

  React.useEffect(() => {
    setControlsApi({
      resetView: () => {
        if (!bounds) return;
        const { center, distance } = bounds.getSize();

        if (controlsRef.current) {
          // Reset the OrbitControls target to the model's computed center
          controlsRef.current.target.copy(center);
          // Set dynamic zoom limits based on the model's framing distance
          controlsRef.current.minDistance = Math.max(0.1, distance * 0.15);
          controlsRef.current.maxDistance = distance * 5.0;
          // Clear damping velocity and update controls
          controlsRef.current.update();
        }

        // Call refresh().clip().fit() on the bounds
        bounds.refresh().clip().fit();
      },
      zoomIn: () => {
        if (!controlsRef.current) return;
        const controls = controlsRef.current;
        const target = controls.target;
        const minDistance = controls.minDistance || 0.1;
        const maxDistance = controls.maxDistance || 100000;

        // Vector along current camera direction toward OrbitControls target
        const offset = new THREE.Vector3().subVectors(camera.position, target);
        const currentDistance = offset.length();
        // Move camera 18% closer to target per click
        const step = Math.max(currentDistance * 0.18, 0.05);
        const newDistance = THREE.MathUtils.clamp(
          currentDistance - step,
          minDistance,
          maxDistance
        );

        offset.setLength(newDistance);
        camera.position.copy(target).add(offset);
        camera.updateMatrixWorld();
        controls.update();
      },
      zoomOut: () => {
        if (!controlsRef.current) return;
        const controls = controlsRef.current;
        const target = controls.target;
        const minDistance = controls.minDistance || 0.1;
        const maxDistance = controls.maxDistance || 100000;

        // Vector along current camera direction away from OrbitControls target
        const offset = new THREE.Vector3().subVectors(camera.position, target);
        const currentDistance = offset.length();
        // Move camera 18% farther from target per click
        const step = Math.max(currentDistance * 0.18, 0.05);
        const newDistance = THREE.MathUtils.clamp(
          currentDistance + step,
          minDistance,
          maxDistance
        );

        offset.setLength(newDistance);
        camera.position.copy(target).add(offset);
        camera.updateMatrixWorld();
        controls.update();
      },
    });
  }, [bounds, camera, controlsRef, setControlsApi]);

  return null;
}

/**
 * Internal 3D Scene setup including lighting rig, bounds, and orbit controls.
 */
function ViewerScene({
  url,
  onModelLogged,
  config,
  setControlsApi,
  prefersReducedMotion,
}: {
  url: string;
  onModelLogged?: (details: ModelTelemetryDetails) => void;
  config?: ConfiguratorState;
  setControlsApi: (api: ControlsAPI) => void;
  prefersReducedMotion: boolean;
}) {
  const controlsRef = React.useRef<OrbitControlsImpl | null>(null);

  return (
    <>
      {/* Background color matching deepest surface token #050505 (--bg-void) */}
      <color attach="background" args={["#050505"]} />

      {/* Neutral Ambient Light */}
      <ambientLight intensity={0.75} color="#FFFFFF" />

      {/* Cool-White Key Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        color="#E0F2FE"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Subtle Acid-Green Rim Light positioned behind the model */}
      <directionalLight
        position={[-5, 4, -6]}
        intensity={2.2}
        color="#A3FF12"
      />

      {/* Studio Environment Preset */}
      <Environment preset="city" environmentIntensity={0.6} />

      {/* Auto-fit and center the model to the viewport bounds */}
      <Bounds
        fit
        clip
        observe
        margin={1.25}
        onFit={(data) => {
          if (controlsRef.current) {
            controlsRef.current.target.copy(data.center);
            controlsRef.current.minDistance = Math.max(0.1, data.distance * 0.15);
            controlsRef.current.maxDistance = data.distance * 5.0;
            controlsRef.current.update();
          }
        }}
      >
        <BoundsController
          setControlsApi={setControlsApi}
          controlsRef={controlsRef}
        />
        <Center top>
          <ModelMesh
            url={url}
            onModelLogged={onModelLogged}
            config={config}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Center>
      </Bounds>

      {/* Soft Contact Shadows on ground */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.55}
        scale={10}
        blur={2.4}
        far={4}
        color="#000000"
      />

      {/* OrbitControls: damped, no panning, polar limits */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2 + 0.08}
        autoRotate={!prefersReducedMotion && false}
      />
    </>
  );
}

/**
 * Reusable ProductViewer Component
 */
export function ProductViewer({
  modelUrl,
  className,
  config,
  onModelLogged,
}: ProductViewerProps) {
  const [controlsApi, setControlsApi] = React.useState<ControlsAPI | null>(null);
  const [contextLost, setContextLost] = React.useState(false);

  // Subscribe to client mounting and prefers-reduced-motion safely without cascading renders
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const prefersReducedMotion = React.useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const webGLAvailable = isMounted ? isWebGLSupported() : null;

  const handleCreated = React.useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      const canvas = gl.domElement;

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.warn("[ClutchGear 3D Viewer] WebGL context lost.");
        setContextLost(true);
      };

      const handleContextRestored = () => {
        console.log("[ClutchGear 3D Viewer] WebGL context restored.");
        setContextLost(false);
      };

      canvas.addEventListener("webglcontextlost", handleContextLost, false);
      canvas.addEventListener("webglcontextrestored", handleContextRestored, false);
    },
    []
  );

  // If WebGL is not supported on client
  if (webGLAvailable === false || contextLost) {
    return (
      <div className={cn("relative w-full h-full min-h-[400px]", className)}>
        <StaticFallbackPanel
          message={
            contextLost
              ? "The WebGL graphics context was lost. Please click below to reload the viewport."
              : "Your browser or graphics hardware does not currently support WebGL 3D acceleration."
          }
        />
      </div>
    );
  }

  // Avoid SSR hydration mismatch before client detection
  if (webGLAvailable === null) {
    return (
      <div
        className={cn(
          "relative w-full h-full min-h-[400px] bg-bg-void rounded-xl flex items-center justify-center",
          className
        )}
      >
        <span className="text-xs font-heading font-bold text-text-muted uppercase tracking-widest animate-pulse">
          INITIALIZING VIEWPORT...
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[400px] bg-bg-void overflow-hidden select-none",
        className
      )}
    >
      <WebGLErrorBoundary fallback={<StaticFallbackPanel />}>
        {/* Suspense Loader */}
        <React.Suspense fallback={<ViewerLoader />}>
          <Canvas
            className="w-full h-full touch-none"
            style={{ touchAction: "none" }}
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
              antialias: true,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0, 100, 300], fov: 45, near: 0.1, far: 500000 }}
            onCreated={handleCreated}
          >
            <ViewerScene
              url={modelUrl}
              onModelLogged={onModelLogged}
              config={config}
              setControlsApi={setControlsApi}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Canvas>
        </React.Suspense>
      </WebGLErrorBoundary>

      {/* Floating HUD Viewport Controls styled per DESIGN_SYSTEM.md Section 6.1.D */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => controlsApi?.resetView()}
          className="p-2.5 rounded-lg bg-surface-1/80 backdrop-blur-md text-text-secondary border border-white/10 hover:border-accent/50 hover:text-accent active:scale-95 transition-all shadow-lg cursor-pointer"
          title="Reset Camera View"
          aria-label="Reset Camera View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsApi?.zoomIn()}
          className="p-2.5 rounded-lg bg-surface-1/80 backdrop-blur-md text-text-secondary border border-white/10 hover:border-accent/50 hover:text-accent active:scale-95 transition-all shadow-lg cursor-pointer"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => controlsApi?.zoomOut()}
          className="p-2.5 rounded-lg bg-surface-1/80 backdrop-blur-md text-text-secondary border border-white/10 hover:border-accent/50 hover:text-accent active:scale-95 transition-all shadow-lg cursor-pointer"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Telemetry watermark indicator */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[11px] font-heading font-bold text-text-secondary uppercase tracking-widest">
          3D VIEWPORT // INTERACTIVE 360°
        </span>
      </div>
    </div>
  );
}

// Preload the default model for maximum performance
useGLTF.preload("/models/mouse-optimized.glb", "/draco/");
