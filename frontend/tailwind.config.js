/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: {
            bg: '#F8FAFC',
            surface: '#FFFFFF',
            cyan: '#0E7490',
            gold: '#B45309',
            text: '#1E293B',
          },
          dark: {
            bg: '#0F172A',
            surface: '#1E293B',
            cyan: '#22D3EE',
            gold: '#FBBF24',
            text: '#F1F5F9',
          }
        },
        status: {
          receita: '#10B981',
          despesa: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}