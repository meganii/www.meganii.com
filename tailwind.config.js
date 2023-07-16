/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'themes/tailwindcss/layouts/**/*.html',
    'layouts/**/*.html',
    'content/**/*.html',
    'content/**/*.md',
  ],
  theme: {
    extend: {
      fontFamily: {
        ja: ["Helvetica Neue", "Arial", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
