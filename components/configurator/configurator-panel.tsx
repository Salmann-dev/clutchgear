"use client";

import * as React from "react";
import {
  ConfiguratorState,
  SWATCH_OPTIONS,
  SurfaceFinish,
} from "./configurator-types";
import { RotateCcw, Sparkles, Check, ShoppingBag, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ConfiguratorPanelProps {
  config: ConfiguratorState;
  onSelectColor: (colorId: string) => void;
  onToggleRgb: (enabled: boolean) => void;
  onSelectFinish: (finish: SurfaceFinish) => void;
  onReset: () => void;
  className?: string;
}

export function ConfiguratorPanel({
  config,
  onSelectColor,
  onToggleRgb,
  onSelectFinish,
  onReset,
  className,
}: ConfiguratorPanelProps) {
  const activeSwatch =
    SWATCH_OPTIONS.find((s) => s.id === config.accentColorId) ||
    SWATCH_OPTIONS[0];

  return (
    <aside
      aria-label="Hardware Configurator"
      className={cn(
        "rounded-xl bg-surface-1/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative",
        className
      )}
    >
      <div className="space-y-6">
        {/* Header & Product Specs */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-text-muted">
              CUSTOM TELEMETRY SUITE
            </span>
            <Badge variant="accent" className="text-[10px]">
              <ShieldCheck className="w-3 h-3 text-accent" />
              <span>TOURNAMENT FIRMWARE</span>
            </Badge>
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary uppercase tracking-tight">
            CLUTCH ONE PRO <span className="text-accent">CONFIGURATOR</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-body leading-relaxed">
            Customize tournament telemetry accents, lighting profiles, and chassis tactile friction. All parameters apply instantaneously.
          </p>
        </div>

        {/* Feature 1: Accent Color Swatches */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between">
            <label
              id="swatch-group-label"
              className="text-xs font-heading font-bold uppercase tracking-wider text-text-primary"
            >
              1. Accent Color
            </label>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent">
              {config.rgbEnabled ? "RGB Cycle Active" : activeSwatch.name}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="swatch-group-label"
            className="grid grid-cols-6 gap-2.5 sm:gap-3"
          >
            {SWATCH_OPTIONS.map((swatch) => {
              const isSelected =
                !config.rgbEnabled && config.accentColorId === swatch.id;

              return (
                <button
                  key={swatch.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${swatch.name} accent color`}
                  disabled={config.rgbEnabled}
                  onClick={() => onSelectColor(swatch.id)}
                  className={cn(
                    "group relative aspect-square rounded-xl p-1 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1",
                    isSelected
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-surface-1 shadow-[0_0_14px_rgba(163,255,18,0.35)] scale-105"
                      : "hover:scale-105 bg-surface-2/60 border border-white/10 hover:border-white/20"
                  )}
                >
                  <span
                    className="w-full h-full rounded-lg transition-transform duration-200 flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {isSelected && (
                      <Check
                        className={cn(
                          "w-4 h-4 stroke-[3]",
                          swatch.id === "white" ? "text-black" : "text-bg-void"
                        )}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature 2: RGB Lighting Mode Switch */}
        <div className="p-4 rounded-xl bg-surface-2/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-primary">
                  2. RGB Telemetry Mode
                </span>
              </div>
              <p className="text-[11px] text-text-secondary font-body">
                Dynamic hue cycling with subtle peripheral luminescence.
              </p>
            </div>

            {/* Accessible Switch Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={config.rgbEnabled}
              aria-label="Toggle RGB Telemetry Mode"
              onClick={() => onToggleRgb(!config.rgbEnabled)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2",
                config.rgbEnabled ? "bg-accent shadow-[0_0_12px_rgba(163,255,18,0.4)]" : "bg-surface-3"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-bg-void shadow-md transition duration-200 ease-in-out",
                  config.rgbEnabled ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>

        {/* Feature 3: Surface Tactile Finish Switch */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label
              id="finish-group-label"
              className="text-xs font-heading font-bold uppercase tracking-wider text-text-primary"
            >
              3. Chassis Finish
            </label>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-text-muted">
              {config.finish === "matte" ? "Micro-Texture" : "High Specular"}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-labelledby="finish-group-label"
            className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-surface-2/80 border border-white/5"
          >
            <button
              type="button"
              role="radio"
              aria-checked={config.finish === "matte"}
              aria-label="Matte Finish"
              onClick={() => onSelectFinish("matte")}
              className={cn(
                "py-2.5 px-3 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                config.finish === "matte"
                  ? "bg-surface-1 text-text-primary border border-white/10 shadow-md"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              Matte (Tournament)
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={config.finish === "glossy"}
              aria-label="Glossy Finish"
              onClick={() => onSelectFinish("glossy")}
              className={cn(
                "py-2.5 px-3 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                config.finish === "glossy"
                  ? "bg-surface-1 text-text-primary border border-white/10 shadow-md"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              Glossy (Reflective)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Reset, Price & Purchase CTA */}
      <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
        {/* Reset Configuration Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Configuration</span>
          </button>

          <span className="text-[11px] font-heading font-bold text-text-muted uppercase tracking-wider">
            PRESET 01 // DEFAULT
          </span>
        </div>

        {/* Live Price Line Placeholder */}
        <div className="p-3 rounded-xl bg-surface-2/40 border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-text-muted block">
              TOTAL ESTIMATE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-body font-black text-text-primary tracking-tight">
                $149.00
              </span>
              <span className="text-xs font-heading font-bold text-text-muted">
                USD
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-heading font-bold uppercase text-accent block">
              {config.finish.toUpperCase()}
              {" // "}
              {config.rgbEnabled ? "RGB" : activeSwatch.name.toUpperCase()}
            </span>
            <span className="text-[10px] text-text-muted font-body">
              Includes PTFE Glides
            </span>
          </div>
        </div>

        {/* Disabled White Buy Button mandated for Phase 3 */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-heading font-bold text-sm uppercase tracking-wider opacity-50 cursor-not-allowed flex items-center justify-center gap-2 shadow-lg select-none"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span>Add to Cart (Coming in Phase 6)</span>
        </button>
      </div>
    </aside>
  );
}
