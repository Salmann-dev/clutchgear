"use client";

import * as React from "react";
import Link from "next/link";
import { ProductViewer } from "@/components/product-viewer";
import { ConfiguratorPanel } from "@/components/configurator/configurator-panel";
import { useConfiguratorState } from "@/components/configurator/use-configurator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Box, Cpu, Eye, SlidersHorizontal } from "lucide-react";

export function DemoConfiguratorView() {
  const {
    config,
    setAccentColor,
    setRgbEnabled,
    setFinish,
    resetConfig,
  } = useConfiguratorState();

  return (
    <div className="w-full pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumb & Page Header */}
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
                  <SlidersHorizontal className="w-3 h-3 text-accent" />
                  <span>PHASE 3 // REAL-TIME 3D CONFIGURATOR</span>
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-text-primary tracking-tight uppercase">
                CLUTCH ONE PRO <span className="text-accent">CONFIGURATOR</span>
              </h1>
              <p className="text-sm text-text-secondary mt-2 font-body max-w-xl">
                Configure tournament hardware telemetry accents, surface tactile friction, and lighting profiles in real-time interactive 3D.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg bg-surface-1 border border-white/10 flex items-center gap-2.5 shadow-sm">
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

              <div className="px-3 py-2 rounded-lg bg-surface-1 border border-white/10 flex items-center gap-2.5 shadow-sm">
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

        {/* 2-Column Split: 3D Viewport (~70vh) on left + Configurator Panel on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: 3D Hardware Viewport */}
          <div className="w-full lg:col-span-7 xl:col-span-8 h-[52vh] sm:h-[60vh] lg:h-[70vh] min-h-[480px] max-h-[820px] rounded-xl border border-white/10 bg-bg-void shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden relative">
            <ProductViewer
              modelUrl="/models/mouse-optimized.glb"
              config={config}
              className="w-full h-full"
            />
          </div>

          {/* Right Column: Configurator Panel */}
          <div className="w-full lg:col-span-5 xl:col-span-4">
            <ConfiguratorPanel
              config={config}
              onSelectColor={setAccentColor}
              onToggleRgb={setRgbEnabled}
              onSelectFinish={setFinish}
              onReset={resetConfig}
            />
          </div>
        </div>

        {/* Static Telemetry & Hardware Spec Bar */}
        <div className="mt-6 p-4 rounded-xl bg-surface-1/70 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body">
          <div className="flex flex-wrap items-center gap-4 text-text-secondary">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>Shader Patch: OnBeforeCompile Linear Recolor</span>
            </div>
            <span className="text-white/10">•</span>
            <div>Lighting: Studio Key + Acid Rim</div>
            <span className="text-white/10">•</span>
            <div>PBR Texture: 2048x2048 Atlas</div>
            <span className="text-white/10">•</span>
            <div>
              State: {config.finish.toUpperCase()}
              {" // "}
              {config.rgbEnabled ? "RGB EMISSIVE" : config.accentColorId.toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-primary">
              CONFIGURATOR ENGINE ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
