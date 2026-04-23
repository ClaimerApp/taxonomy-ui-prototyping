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
        // HMRC CT600 form palette
        hmrc: '#05808c',
        hmrcDark: '#046870',
        hmrcTint: '#e8f3f4',
        hmrcField: '#d9ecee',
        hmrcBorder: '#bcdcdf',
        // Customer R&D claim report accent (deep teal, distinct from HMRC)
        reportAccent: '#0f7a6d',
        reportAccentSoft: '#e4f1ef',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hmrc: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
