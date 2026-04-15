import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A3A6B",
          gold: "#C9A84C",
          cream: "#F8F4EA",
          ink: "#10233F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 35, 63, 0.12)",
      },
      backgroundImage: {
        "school-radial":
          "radial-gradient(circle at top, rgba(201, 168, 76, 0.22), transparent 34%), linear-gradient(135deg, #1A3A6B 0%, #10233F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
