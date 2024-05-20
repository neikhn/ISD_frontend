const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,js}"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        literata: ["Literata", "serif"],
      },
      colors: {
        pinky: {
          50: "#FFF5E4",
          200: "#FFE3E1",
          400: "#FFD1D1",
          600: "#FF9494",
        },
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideUp: {
          "100%": { transform: "translateY(0)" },
          "0%": { transform: "translateY(-100%)" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        slideDown: "slideDown 0.4s ease-in-out",
        slideUp: "slideUp 0.4s ease-in-out",
        fadeIn: "fadeIn 0.4s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["autofill"],
      textColor: ["autofill"],
    },
  },
  plugins: [],
};
