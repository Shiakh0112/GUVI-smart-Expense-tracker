/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        expense: "#8b5cf6",
        "expense-light": "#a78bfa",
        "expense-dark": "#7c3aed",
        glass: "rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "app-gradient": "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.4)",
        glow: "0 0 20px rgba(139,92,246,0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
