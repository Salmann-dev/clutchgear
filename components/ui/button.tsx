import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "checkout" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-heading font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas";

    const variantStyles = {
      // Primary Cyan button: Uses #080811 dark text for 14.16:1 WCAG AAA compliance!
      primary:
        "bg-cyan-500 text-text-on-cyan hover:bg-cyan-400 active:bg-cyan-600 shadow-[0_0_16px_rgba(0,240,255,0.3)]",
      // Checkout / Add to Cart button ONLY: Uses Rose #E11D48 with white text (4.70:1 AA)
      checkout:
        "bg-rose-600 text-text-on-rose hover:bg-rose-500 active:bg-rose-700 shadow-[0_8px_24px_rgba(225,29,72,0.38)]",
      // Secondary Surface button
      secondary:
        "bg-surface-1 text-text-primary border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-surface-2",
      // Ghost utility button
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
      // Floating 3D HUD control button
      icon:
        "bg-surface-1/80 backdrop-blur-md text-text-secondary border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-surface-2",
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
