/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Gold Metallic - ذهبي معدني
        gold: {
          50: '#fdf9ed',
          100: '#faf0c9',
          200: '#f4df8a',
          300: '#edc742',
          400: '#e5b320',
          500: '#D4AF37', // Gold Metallic الأساسي
          600: '#b8941f',
          700: '#947418',
          800: '#7a5e16',
          900: '#684e18',
          950: '#3d2b0a',
        },
        // ✅ Silver - فضي
        silver: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#C0C0C0', // Silver الأساسي
          500: '#a1a1aa',
          600: '#8a8a93',
          700: '#71717a',
          800: '#52525b',
          900: '#3f3f46',
          950: '#27272a',
        },
        // ✅ Royal Black - أسود ملكي
        royal: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#b5b5b5',
          400: '#8f8f8f',
          500: '#6e6e6e',
          600: '#545454',
          700: '#434343',
          800: '#2a2a2a',
          900: '#1a1a1a',
          950: '#0A0A0A', // Royal Black الأساسي
        },
        // ✅ Burgundy - عنابي ملكي
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a9b9',
          400: '#ec7690',
          500: '#e0486d',
          600: '#cc2654',
          700: '#ab1942',
          800: '#800020', // Burgundy الأساسي
          900: '#6d0820',
          950: '#3f010f',
        },
        // ✅ Ivory - عاجي
        ivory: '#FFFFF0',
        // ✅ Champagne - شامبانيا
        champagne: '#F7E7CE',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Tajawal', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
      },
      boxShadow: {
        'royal': '0 4px 20px rgba(10, 10, 10, 0.15)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.25)',
        'luxury': '0 10px 40px rgba(10, 10, 10, 0.2)',
        'glow': '0 0 40px rgba(212, 175, 55, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}