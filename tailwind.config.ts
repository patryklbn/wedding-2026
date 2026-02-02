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
        // Scottish countryside palette
        sage: {
          50: "#f6f7f4",
          100: "#e3e7de",
          200: "#c8d0be",
          300: "#a6b396",
          400: "#869776",
          500: "#6b7c5c",
          600: "#546248",
          700: "#434e3a",
          800: "#384031",
          900: "#30372b",
        },
        heather: {
          50: "#faf8fa",
          100: "#f3f0f4",
          200: "#e8e2ea",
          300: "#d5cbda",
          400: "#baa9c1",
          500: "#9c87a5",
          600: "#836d8c",
          700: "#6d5a73",
          800: "#5c4c60",
          900: "#4d4150",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
        cream: {
          50: "#fdfcfa",
          100: "#faf8f3",
          200: "#f5f0e6",
          300: "#ede5d3",
          400: "#dfd3b8",
          500: "#c9b896",
        },
        rust: {
          50: "#fdf6f3",
          100: "#faeae3",
          200: "#f5d5c7",
          300: "#edb9a3",
          400: "#e29676",
          500: "#d4724e",
          600: "#c45c3a",
          700: "#a34830",
          800: "#863d2c",
          900: "#6e3528",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Montserrat", "system-ui", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
