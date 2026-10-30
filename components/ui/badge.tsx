import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "success" | "neutral" | "rose";
}

export function Badge({
  className,
  variant = "cyan",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    neutral: "bg-white/5 text-text-secondary border-white/10",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-heading font-bold uppercase tracking-wider border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
