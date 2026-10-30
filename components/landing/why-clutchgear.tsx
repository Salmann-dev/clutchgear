import * as React from "react";
import { Trophy, ShieldCheck, Cpu, Compass } from "lucide-react";
import { WHY_CLUTCHGEAR_PILLARS } from "@/lib/mock-data";

export function WhyClutchGear() {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className="w-6 h-6 text-cyan-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-cyan-400">
              PHILOSOPHY & STANDARDS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary uppercase tracking-tight">
            WHY CLUTCHGEAR
          </h2>
          <p className="text-sm text-text-secondary mt-3 font-body">
            Crafted for hardware purists who prioritize raw speed, tactile honesty, and zero background bloat.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CLUTCHGEAR_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl bg-surface-1/60 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-2 border border-white/5 flex items-center justify-center mb-5 shadow-inner">
                  {getPillarIcon(pillar.icon)}
                </div>
                <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-cyan-400">
                  {pillar.subtitle}
                </div>
                <h3 className="text-lg font-heading font-bold text-text-primary mt-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-text-secondary mt-3 leading-relaxed font-body">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-heading font-bold text-text-muted uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>CERTIFIED SPEC</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
