import * as React from "react";
import { Feather, Crosshair, Zap, Activity } from "lucide-react";
import { BENTO_SPECS } from "@/lib/mock-data";

export function BentoSpecs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Feather":
        return <Feather className="w-5 h-5 text-accent" />;
      case "Crosshair":
        return <Crosshair className="w-5 h-5 text-accent" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-accent" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-accent" />;
      default:
        return <Zap className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section id="specs" className="py-20 md:py-28 bg-surface-1/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-accent">
              ARCHITECTURE & TELEMETRY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary uppercase tracking-tight">
            ENGINEERED WITHOUT COMPROMISE
          </h2>
          <p className="text-sm text-text-secondary mt-3 font-body">
            Every millimeter and microcircuit is optimized for raw competitive esports performance.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENTO_SPECS.map((spec) => (
            <div
              key={spec.id}
              className={`rounded-2xl bg-surface-1/80 border border-white/10 hover:border-accent/40 transition-all duration-300 p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.4)] ${
                spec.span === "col-span-2" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div>
                {/* Top Row: Tag & Icon */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                    <span className="text-[11px] font-heading font-bold text-accent uppercase tracking-widest">
                      {spec.tag}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-2/60 border border-white/5 flex items-center justify-center">
                    {getIcon(spec.icon)}
                  </div>
                </div>

                {/* Big Metric Display */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-heading font-black text-text-primary tracking-tight">
                      {spec.stat}
                    </span>
                    {spec.unit && (
                      <span className="text-xs font-heading font-bold uppercase tracking-wider text-accent">
                        {spec.unit}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-text-primary mt-2">
                    {spec.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-body">
                  {spec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
