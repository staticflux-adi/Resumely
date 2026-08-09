/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c2d6ff',
          300: '#9ab8ff',
          400: '#6d90ff',
          500: '#4a6bff',
          600: '#3346f0',
          700: '#2a35c7',
          800: '#252d9e',
          900: '#232a7d',
          950: '#151752',
        },
        accent: {
          400: '#f9a94a',
          500: '#f78c1f',
          600: '#e57312',
        },
      },
      boxShadow: {
        soft: '0 2px 20px -4px rgba(20, 20, 60, 0.08)',
        card: '0 8px 30px -8px rgba(20, 20, 60, 0.15)',
        glow: '0 0 40px -8px rgba(74, 107, 255, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        gradient: 'gradientShift 8s ease infinite',
      },
    },
  },
  plugins: [],
}
