import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "buy" | "success" | "neutral";
}

export function Badge({
  className,
  variant = "accent",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    accent: "bg-accent/10 text-accent border-accent/30",
    buy: "bg-white/10 text-white border-white/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    neutral: "bg-white/5 text-text-secondary border-white/10",
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
