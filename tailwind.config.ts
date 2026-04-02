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
        // Sacred Premium Palette
        navy: {
          950: "#050810",
          900: "#0A0E1A",
          800: "#0F1628",
          700: "#151E38",
          600: "#1C2848",
        },
        saffron: {
          300: "#F9C46A",
          400: "#F4A520",
          500: "#E8821A",
          600: "#D4691A",
          700: "#B85A14",
        },
        gold: {
          200: "#F0DFA8",
          300: "#E2C46B",
          400: "#C9A84C",
          500: "#A8882C",
          600: "#856A1A",
        },
        lotus: {
          50: "#FDFAF4",
          100: "#F9F4EC",
          200: "#F0E8D6",
          300: "#E4D4B8",
        },
        earth: {
          800: "#3D2B1F",
          700: "#52392A",
          600: "#6B4A35",
        },
        sage: {
          400: "#8B9B7A",
          500: "#7A8A69",
          600: "#697859",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 2rem)", { lineHeight: "1.2" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "caption": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },
      spacing: {
        // 8pt scale
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      maxWidth: {
        "content": "1200px",
        "narrow": "800px",
        "wide": "1440px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gold": "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        "sacred": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "reveal": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        "xs": "2px",
      },
      boxShadow: {
        "gold-sm": "0 2px 12px rgba(201, 168, 76, 0.15)",
        "gold-md": "0 4px 24px rgba(201, 168, 76, 0.2)",
        "gold-lg": "0 8px 48px rgba(201, 168, 76, 0.25)",
        "inset-top": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
