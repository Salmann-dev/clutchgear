import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-void": "#080811",
        "bg-canvas": "#0F0F23",
        "surface-1": "#14142B",
        "surface-2": "#1D1D3A",
        "surface-3": "#26264D",
        "surface-glass": "rgba(20, 20, 43, 0.72)",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "border-strong": "rgba(255, 255, 255, 0.16)",
        "border-accent": "rgba(0, 240, 255, 0.40)",
        "cyan-500": "#00F0FF",
        "cyan-400": "#38F9FF",
        "cyan-600": "#00C2CF",
        "cyan-tint": "rgba(0, 240, 255, 0.10)",
        "rose-600": "#E11D48",
        "rose-500": "#F43F5E",
        "rose-700": "#BE123C",
        "rose-tint": "rgba(225, 29, 72, 0.12)",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        "text-on-cyan": "#080811",
        "text-on-rose": "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-chakra)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      boxShadow: {
        "surface-1":
          "0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08) inset",
        "surface-2":
          "0 20px 48px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12) inset",
        "cyan-halo": "0 0 0 2px #0F0F23, 0 0 0 4px #00F0FF",
        "rose-aura":
          "0 8px 24px -2px rgba(225, 29, 72, 0.40), 0 0 0 1px rgba(255, 255, 255, 0.2) inset",
      },
    },
  },
  plugins: [],
};

export default config;
