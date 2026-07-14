/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ أمير - الألوان الملكية الجديدة
        // الخلفية البنية الداكنة (Wood Background)
        amir: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#a18072', // بني خشبي متوسط
          600: '#8a6a5f', // بني داكن
          700: '#6d4c41', // بني غامق جداً
          800: '#4A3428', // بني داكن (الخلفية الرئيسية)
          900: '#3D2817', // أغمق
          950: '#2A1A0F', // الأسود البني
        },
        
        // اللون العنابي الملكي (Burgundy Royal)
        royal: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a', // عنابي غامق جداً (مثل الخلفية في الصورة)
        },
        
        // الذهبي المعدني (Metallic Gold)
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // ذهبي برتقالي (مثل الأرقام في الصورة)
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        // البرتقالي الذهبي (Golden Orange - للأرقام والنصوص المميزة)
        amber: {
          50: '#fff8f1',
          100: '#ffeddb',
          200: '#ffd9b3',
          300: '#ffc080',
          400: '#ffa34d',
          500: '#FF6B35', // برتقالي ذهبي (مثل الأرقام)
          600: '#F7931E',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
          950: '#78350f',
        },
        
        // الكريمي/العاجي (Ivory/Cream - للنصوص)
        cream: {
          50: '#fffffb',
          100: '#fffff7',
          200: '#ffffef',
          300: '#ffffe6',
          400: '#ffffda',
          500: '#FFF8DC', // Cream أساسي
          600: '#f5f0e1',
          700: '#e6e0d4',
          800: '#d6d0c7',
          900: '#c6c0ba',
          950: '#b6b0ad',
        },
        
        // الأبيض الدافئ (Warm White)
        ivory: {
          DEFAULT: '#FFFFF0',
          50: '#fffffb',
          100: '#fffff7',
          200: '#ffffef',
        },
        
        // الشامبانيا (Champagne)
        champagne: {
          DEFAULT: '#F7E7CE',
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f7e7ce',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Tajawal', 'Inter', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' },
        },
      },
      boxShadow: {
        'amir': '0 4px 20px rgba(74, 52, 40, 0.15)',
        'royal': '0 4px 20px rgba(69, 10, 10, 0.2)',
        'gold': '0 4px 20px rgba(245, 158, 11, 0.25)',
        'amber': '0 4px 20px rgba(255, 107, 53, 0.3)',
        'luxury': '0 10px 40px rgba(74, 52, 40, 0.25)',
        'glow': '0 0 40px rgba(255, 107, 53, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}