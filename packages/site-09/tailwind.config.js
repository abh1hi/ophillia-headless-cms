/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f19416",
        "secondary": "#9f2802",
        "background-light": "#ffffff",
        "background-dark": "#7a1e02",
        "brand": {
          "orange": "#FF7F41",
          "red": "#EB5C3F",
          "dark": "#3A2B24",
          "bg": '#F8F5EE',
          "textDark": '#3A2B24',
          "green": '#88C959',
          "yellow": '#FFD426',
          "bannerBg": '#3B2922',
          "bannerBorder": '#513D35',
          "iconRed": '#EB5C3F',
          "iconYellow": '#F4C622',
          "iconGreen": '#79B949'
        },
        "slate": {
          50: '#f8f8f8',
          100: '#f1f1f1',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#a0a0a0',
          500: '#717171',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0f0200',
        }
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"],
        "sans": ['"Plus Jakarta Sans"', 'sans-serif'],
        "serif": ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'orange': '0 10px 25px -5px rgba(255, 127, 65, 0.4)',
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
