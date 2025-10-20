/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B21B6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          50: '#E0F7FB',
          100: '#C1EFF7',
          200: '#83DFEF',
          300: '#45CFE7',
          400: '#07BFDF',
          500: '#06B6D4',
          600: '#0591A8',
          700: '#046C7D',
          800: '#034851',
          900: '#012426',
        },
        background: '#F9FAFB',
        danger: '#DC2626',
        success: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
