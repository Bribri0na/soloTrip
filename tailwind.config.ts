import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#3F6E2F", deep: "#2F5623" },
        sage: "#A3BD8E",
        cream: "#FAFBF6",
        mist: "#EEF3E6",
        ink: "#1E2A18",
        sunset: "#E0823A",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-rounded", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;