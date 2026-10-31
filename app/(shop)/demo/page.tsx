import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ProductViewer } from "@/components/product-viewer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Box, Cpu, Eye, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "3D Hardware Viewport | ClutchGear",
  description:
    "Interactive 360-degree real-time 3D hardware viewport for the Clutch One Pro Wireless competitive gaming mouse.",
};

export default function DemoPage() {
  return (
    <div className="w-full pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Link & Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Badge variant="accent">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>PHASE 2 HARDWARE PREVIEW</span>
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-text-primary tracking-tight uppercase">
                CLUTCH ONE PRO <span className="text-accent">3D VIEWPORT</span>
              </h1>
              <p className="text-sm text-text-secondary mt-2 font-body max-w-xl">
                Tournament-spec esports peripheral rendered in high-fidelity 3D with PBR surface reflections, studio key lighting, and directional acid-green telemetry rim illumination.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-surface-1 border border-white/10 flex items-center gap-2.5">
                <Box className="w-4 h-4 text-accent" />
                <div>
                  <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                    GEOMETRY
                  </div>
                  <div className="text-xs font-heading font-bold text-text-primary">
                    54g Solid Unibody
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 rounded-lg bg-surface-1 border border-white/10 flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-accent" />
                <div>
                  <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted">
                    DECOMPRESSION
                  </div>
                  <div className="text-xs font-heading font-bold text-text-primary">
                    Google Draco WASM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Viewport Frame: ~70vh tall, rounded-xl per requirements */}
        <div className="w-full h-[70vh] min-h-[500px] max-h-[850px] rounded-xl border border-white/10 bg-bg-void shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden relative">
          <ProductViewer
            modelUrl="/models/mouse-optimized.glb"
            className="w-full h-full"
          />
        </div>

        {/* Static Telemetry & Hardware Spec Bar (no fake real-time FPS) */}
        <div className="mt-6 p-4 rounded-xl bg-surface-1/70 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body">
          <div className="flex flex-wrap items-center gap-4 text-text-secondary">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>Tone Mapping: ACESFilmic</span>
            </div>
            <span className="text-white/10">•</span>
            <div>Lighting: Studio Key + Acid Green Rim</div>
            <span className="text-white/10">•</span>
            <div>Shadows: Contact Ground Plane</div>
            <span className="text-white/10">•</span>
            <div>Controls: Orbit 360° (Damped)</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-primary">
              HARDWARE TELEMETRY ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

