import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#131210",
        paper: "#F5F2EC",
        fog: "#EDE9E0",
        stone: "#B7AFA0",
        hairline: "#D9D4C7",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      screens: {
        xs: "360px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)",
      },
      height: {
        svh: "100svh",
      },
    },
  },
  plugins: [],
};

export default config;
