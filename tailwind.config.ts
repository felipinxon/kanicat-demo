import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kanicat brand — sampled from the real logo (morado + verde)
        brand: {
          purple: {
            DEFAULT: "#6E2E92",
            50: "#F6EEFB",
            100: "#EADAF4",
            200: "#D6B4E8",
            300: "#BC8AD7",
            400: "#9D5CBF",
            500: "#7E3AA6",
            600: "#6E2E92",
            700: "#571E77",
            800: "#43175C",
            900: "#2F0F41",
          },
          green: {
            DEFAULT: "#4FA83C",
            50: "#EEF9EA",
            100: "#DBF1D2",
            200: "#B9E3A8",
            300: "#8FD177",
            400: "#6FBF54",
            500: "#4FA83C",
            600: "#3E8A2E",
            700: "#316C25",
            800: "#264F1D",
            900: "#1B3814",
          },
          sky: "#2FA9DE",
          gold: "#F2CE3B",
          ink: "#17141F",
          cream: "#FBF8F3",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(110,46,146,0.45)",
        "glow-green": "0 0 60px -15px rgba(79,168,60,0.45)",
        soft: "0 20px 60px -25px rgba(23,20,31,0.35)",
      },
      backgroundImage: {
        "brand-mesh":
          "radial-gradient(60% 60% at 15% 20%, rgba(110,46,146,0.35) 0%, transparent 60%), radial-gradient(55% 55% at 85% 15%, rgba(47,169,222,0.28) 0%, transparent 60%), radial-gradient(60% 60% at 75% 85%, rgba(79,168,60,0.30) 0%, transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        "scroll-x": {
          to: { transform: "translateX(calc(-50% - 0.5rem))" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        shimmer: "shimmer 2.2s linear infinite",
        aurora: "aurora 60s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "scroll-x": "scroll-x 40s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        gradient: "gradient 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
