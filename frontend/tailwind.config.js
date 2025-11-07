/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        "bounce-r": {
          "0%, 100%": {
            transform: "translateX(-15%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "bounce-l": {
          "0%, 100%": {
            transform: "translateX(15%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "none",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "bounce-r": "bounce-r 1.5s infinite",
        "bounce-l": "bounce-l 1.5s infinite",
      },
    },
  },
  plugins: [],
};
