/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./hugo_stats.json'],
  theme: {
    extend: {
      fontFamily: {
        ja: ["Helvetica Neue", "Arial", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
      },
    },
  },
  plugins: [],
}