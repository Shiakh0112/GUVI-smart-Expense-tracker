/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        expense: "#7e69ab",
        "expense-light": "#9b87f5",
        "expense-dark": "#6e59a5",
      },
    },
  },
  plugins: [],
};
