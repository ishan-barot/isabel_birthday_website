
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFE4E6',
        'soft-cream': '#FFF8F0',
        'lavender': '#E6E6FA',
        'sky-blue': '#E0F6FF',
        'sage': '#F0F8F0',
        'sunset-gold': '#FFE5B4',
        'rose-pink': '#FFB6C1',
        'cherry-blossom': '#FFB7C5',
        'cottagecore': {
          50: '#FFF8F5',
          100: '#FFE4E6',
          200: '#FFB6C1',
          300: '#FF91A4',
          400: '#FF6B8A',
          500: '#FF4569',
          600: '#E63946',
          700: '#CC2936',
          800: '#B31E2B',
          900: '#99141F'
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heart-pulse': 'heart-pulse 1.5s ease-in-out infinite',
        'petal-fall': 'petal-fall 8s linear infinite',
        'grow': 'grow 2s ease-out forwards',
        'fade-in': 'fade-in 1s ease-in forwards',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'heart-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        grow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'twilight-gradient': 'linear-gradient(to bottom, #FFE4E6, #E6E6FA, #E0F6FF)',
        'sunset-gradient': 'linear-gradient(45deg, #FFE5B4, #FFB6C1, #E6E6FA)',
      }
    },
  },
  plugins: [],
}
export default config
