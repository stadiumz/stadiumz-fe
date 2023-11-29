/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6720FF',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#E6D4FF',
          '300': '#CDB0FF',
          '400': '#B58CFF',
          '500': '#9C68FF',
          '600': '#8044FF',
          '700': '#6720FF',
          '800': '#4D00FF',
          '900': '#3400CC'
        }
      }
    },
    // brand colors purple
    
  },
  darkMode: 'media', // or 'media' or 'class'
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [require('@tailwindcss/typography'),require("daisyui")],
}

