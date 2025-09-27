/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ✅ must be here, not outside
  theme: {
    extend: {},
  },
  plugins: [],
}
