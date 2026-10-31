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
        "bg-void": "#050505",
        "bg-canvas": "#0A0A0A",
        "surface-1": "#121212",
        "surface-2": "#1A1A1A",
        "surface-3": "#242424",
        "surface-glass": "rgba(18, 18, 18, 0.75)",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "border-strong": "rgba(255, 255, 255, 0.16)",
        "border-accent": "rgba(163, 255, 18, 0.40)",
        accent: {
          DEFAULT: "#A3FF12",
          hover: "#B5FF3B",
          active: "#8FE600",
          tint: "rgba(163, 255, 18, 0.10)",
        },
        "buy-white": "#FFFFFF",
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-muted": "#64748B",
        "text-on-accent": "#050505",
        "text-on-buy": "#050505",
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
        "accent-halo": "0 0 0 2px #0A0A0A, 0 0 0 4px #A3FF12",
        "buy-aura":
          "0 8px 24px -2px rgba(255, 255, 255, 0.30), 0 0 0 1px rgba(255, 255, 255, 0.4) inset",
      },
    },
  },
  plugins: [],
};

export default config;
