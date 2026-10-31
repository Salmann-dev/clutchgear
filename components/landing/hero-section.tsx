import * as React from "react";
import Link from "next/link";
import { ArrowRight, Box, Cpu, Zap, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial accent - subtle, non-intrusive */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="accent" className="animate-pulse">
              <Zap className="w-3 h-3 text-accent" />
              <span>NEW LAUNCH // 54G ULTRA-LIGHTWEIGHT</span>
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-text-primary uppercase leading-[1.08]">
            PRECISION ENGINEERED FOR <span className="text-accent">COMPETITIVE</span> SUPREMACY
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
            Uncompromising tournament performance featuring zero-debounce optical micro-switches, 4000Hz wireless polling, and raw 1:1 unsmoothed tracking inside an ultra-rigid 54g unibody chassis.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#featured">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-[0_0_24px_rgba(163,255,18,0.35)]">
                <span>EXPLORE PERIPHERALS</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="#specs">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Box className="w-4 h-4 mr-1 text-accent" />
                <span>HARDWARE SPECS</span>
              </Button>
            </Link>
          </div>

          {/* Telemetry Telemetry Strip */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-surface-1/60 border border-white/5 backdrop-blur-sm text-left">
              <div className="flex items-center gap-2 text-accent mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-muted">CHASSIS</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">54 Grams</div>
              <p className="text-xs text-text-secondary mt-0.5 font-body">Solid unibody architecture</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1/60 border border-white/5 backdrop-blur-sm text-left">
              <div className="flex items-center gap-2 text-accent mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-muted">POLLING</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">4000 Hz</div>
              <p className="text-xs text-text-secondary mt-0.5 font-body">0.25ms report interval</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1/60 border border-white/5 backdrop-blur-sm text-left">
              <div className="flex items-center gap-2 text-accent mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-muted">TRACKING</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">26K DPI</div>
              <p className="text-xs text-text-secondary mt-0.5 font-body">HyperTrack Gen-3 sensor</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1/60 border border-white/5 backdrop-blur-sm text-left">
              <div className="flex items-center gap-2 text-accent mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-text-muted">SWITCHES</span>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary">100M Clicks</div>
              <p className="text-xs text-text-secondary mt-0.5 font-body">LightBeam optical actuation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
