import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple System Palette
        apple: {
          bg:        "#FFFFFF",
          "bg-gray": "#F5F5F7",
          "bg-soft": "#FBFBFD",
          text:      "#1D1D1F",
          "text-2":  "#6E6E73",
          "text-3":  "#86868B",
          muted:     "#AEAEB2",
          border:    "#D2D2D7",
          "border-subtle": "#E8E8ED",
          blue:      "#0071E3",
          black:     "#1D1D1F",
          "black-2": "#3A3A3C",
        },
        // Brand accent
        gold: {
          DEFAULT: "#B8860B",
          light:   "#D4A017",
          pale:    "#F0D080",
        },
        saffron: {
          DEFAULT: "#C67C11",
          light:   "#E09020",
        },
        // Canvas (dark cinematic section)
        canvas: {
          bg:   "#050810",
          navy: "#0A0E1A",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body:    ["Inter", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(3.5rem, 8vw, 7rem)",   { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-xl":   ["clamp(2.75rem, 5.5vw, 5rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        "display-lg":   ["clamp(2rem, 4vw, 3.75rem)",   { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md":   ["clamp(1.5rem, 2.5vw, 2.5rem)",{ lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm":   ["clamp(1.25rem, 2vw, 1.875rem)",{ lineHeight: "1.18", letterSpacing: "-0.01em" }],
        "body-xl":      ["1.25rem",  { lineHeight: "1.7" }],
        "body-lg":      ["1.125rem", { lineHeight: "1.7" }],
        "body-md":      ["1rem",     { lineHeight: "1.65" }],
        "body-sm":      ["0.9375rem",{ lineHeight: "1.6" }],
        "caption":      ["0.8125rem",{ lineHeight: "1.5", letterSpacing: "0.01em" }],
        "label":        ["0.75rem",  { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        content: "1080px",
        narrow:  "720px",
        wide:    "1440px",
      },
      borderRadius: {
        "apple-sm": "6px",
        "apple-md": "10px",
        "apple-lg": "18px",
        "apple-xl": "24px",
        "apple-2xl":"32px",
      },
      boxShadow: {
        "apple-xs": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "apple-sm": "0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)",
        "apple-md": "0 4px 16px rgba(0,0,0,0.09), 0 2px 6px rgba(0,0,0,0.06)",
        "apple-lg": "0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.07)",
        "apple-xl": "0 16px 48px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.08)",
        "gold":     "0 4px 24px rgba(184,134,11,0.18)",
      },
      transitionTimingFunction: {
        "apple":  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "reveal": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "float":  "float 6s ease-in-out infinite",
        "shimmer":"shimmer 3s linear infinite",
        "fade-up":"fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
