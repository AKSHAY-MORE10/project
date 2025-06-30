/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        royal: {
          50: '#f8f7ff',
          100: '#f0edff',
          200: '#e4ddff',
          300: '#d1c2ff',
          400: '#b899ff',
          500: '#9c6bff',
          600: '#8b47ff',
          700: '#7c2dff',
          800: '#6b1fff',
          900: '#5a0fff',
          950: '#3d0099',
        },
        gold: {
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fff4c6',
          300: '#ffe991',
          400: '#ffd652',
          500: '#ffc107',
          600: '#e6a700',
          700: '#cc9600',
          800: '#b38600',
          900: '#997500',
          950: '#805f00',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};