import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "buy" | "checkout" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-heading font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas";

    const variantStyles = {
      // Primary Acid Green button: Uses #050505 dark text for ultra-high contrast WCAG AAA compliance!
      primary:
        "bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-active shadow-[0_0_16px_rgba(163,255,18,0.35)]",
      // White Buy button: Clean high-visibility White Buy Button
      buy:
        "bg-white text-black hover:bg-neutral-200 active:bg-neutral-300 font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]",
      // Checkout alias for buy button
      checkout:
        "bg-white text-black hover:bg-neutral-200 active:bg-neutral-300 font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)]",
      // Secondary Surface button
      secondary:
        "bg-surface-1 text-text-primary border border-white/10 hover:border-accent/50 hover:text-accent hover:bg-surface-2",
      // Ghost utility button
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
      // Floating 3D HUD control button
      icon:
        "bg-surface-1/80 backdrop-blur-md text-text-secondary border border-white/10 hover:border-accent/50 hover:text-accent hover:bg-surface-2",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-md gap-1.5",
      md: "h-11 px-5 text-sm rounded-lg gap-2",
      lg: "h-13 px-7 text-base rounded-lg gap-2.5 uppercase font-bold",
      icon: "h-10 w-10 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
