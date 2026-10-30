import * as React from "react";
import Link from "next/link";
import { ShieldAlert, Cpu, Radio, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-bg-void/90 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* MANDATORY DISCLAIMER NOTE */}
        <div className="mb-12 p-4 md:p-5 rounded-xl bg-surface-1/80 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-heading font-bold text-text-primary tracking-wide uppercase">
                Demo Store Notice
              </p>
              <p className="text-xs text-text-secondary font-body mt-0.5">
                Demo store, not real products. All peripherals, model specs, and technologies are conceptual simulations for demonstration.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-heading font-semibold text-text-muted">
              SIMULATION ENVIRONMENT
            </span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-surface-1 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <span className="font-heading font-black text-xs">CG</span>
              </div>
              <span className="font-heading font-extrabold text-lg tracking-wider text-text-primary">
                CLUTCH<span className="text-cyan-500">GEAR</span>
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-body">
              Engineering competitive peripherals with uncompromising tactile feedback, sub-millisecond polling rates, and zero-weight chassis ergonomics.
            </p>
          </div>

          {/* Peripherals */}
          <div>
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Hardware
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary font-body">
              <li>
                <Link href="#featured" className="hover:text-text-primary transition-colors">
                  Clutch One Pro Wireless
                </Link>
              </li>
              <li>
                <Link href="#featured" className="hover:text-text-primary transition-colors">
                  Clutch Apex-60 Keypad
                </Link>
              </li>
              <li>
                <Link href="#featured" className="hover:text-text-primary transition-colors">
                  Clutch Pulse-7 Headset
                </Link>
              </li>
              <li>
                <Link href="#specs" className="hover:text-text-primary transition-colors">
                  Precision PTFE Glides
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary font-body">
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-text-muted" />
                <span>HyperTrack Gen-3 Optical</span>
              </li>
              <li className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-text-muted" />
                <span>OmniLink 4000Hz Telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-text-muted" />
                <span>LightBeam 100M Switches</span>
              </li>
            </ul>
          </div>

          {/* Telemetry Status */}
          <div>
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-cyan-400 mb-4">
              Telemetry Status
            </h4>
            <div className="p-3 rounded-lg bg-surface-1 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-muted">Core Engine</span>
                <span className="text-emerald-400 font-heading font-bold">ONLINE (0.25ms)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-muted">3D Model Stream</span>
                <span className="text-cyan-400 font-heading font-bold">READY (4.8MB)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-text-muted">Color Palette</span>
                <span className="text-text-secondary font-heading font-bold">CYAN / VOID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 ClutchGear Laboratory. All conceptual hardware rights reserved.</p>
          <p className="text-[11px] font-heading tracking-widest text-text-secondary">
            PRECISION // AGILITY // SUPREMACY
          </p>
        </div>
      </div>
    </footer>
  );
}
