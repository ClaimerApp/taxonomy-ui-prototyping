/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFC832',
        amber: '#F5B85A',
        cream: '#FFFBF5',
        charcoal: '#3C3636',
        nearblack: '#1A1412',
        darkgold: '#946B00',
        warmgrey: '#C4B8A8',
        lavender: '#E0D0F0',
        lilac: '#E8D5F5',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
