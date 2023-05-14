/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        MainColor: "#B37DD1",
        SubColor: "#955AB7",
      },
    },
  },
  plugins: [],
};
