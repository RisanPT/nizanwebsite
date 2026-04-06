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
        navy: {
          DEFAULT: "#0b1b3b",
          light: "#122040",
          dark: "#060f22",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e8c84a",
          dark: "#a07d1a",
          muted: "rgba(201, 162, 39, 0.15)",
        },
        cream: "#f9f5ef",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "draw-underline": "drawUnderline 1s ease-out forwards",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drawUnderline: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 162, 39, 0.4)" },
          "50%": { boxShadow: "0 0 0 16px rgba(201, 162, 39, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a227 0%, #e8c84a 50%, #c9a227 100%)",
        "navy-gradient": "linear-gradient(135deg, #0b1b3b 0%, #122040 100%)",
        "hero-overlay": "linear-gradient(to right, rgba(11, 27, 59, 0.92) 0%, rgba(11, 27, 59, 0.5) 60%, rgba(11, 27, 59, 0.1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
