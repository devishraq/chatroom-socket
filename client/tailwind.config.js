/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{html,js}",
    './script/*.js'
  ],
  theme: {
    screens: {
      'xs': '475px',
    },
    extend: {},
  },
  plugins: [],
}