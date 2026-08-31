/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          900: '#064E3B',
        },
        slate: { 50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0', 500:'#64748B', 700:'#334155', 900:'#0F172A' },
        amber: { 50:'#FFFBEB', 200:'#FDE68A', 500:'#F59E0B', 600:'#D97706', 900:'#78350F' },
        rose:  { 50:'#FFF1F2', 200:'#FECDD3', 600:'#E11D48' },
        category: {
          transport: { 600:'#2563EB', 50:'#EFF6FF' },
          meals:     { 600:'#059669', 50:'#ECFDF5' },
          boats:     { 600:'#9333EA', 50:'#FAF5FF' },
          rentals:   { 600:'#D97706', 50:'#FFFBEB' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        numeric: ['Inter', 'ui-monospace'],
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px -2px rgb(5 150 105 / 0.08)',
        'ring-brand': '0 0 0 3px rgb(5 150 105 / 0.25)',
      },
      borderRadius: { 'card': '12px', 'modal': '16px' },
    },
  },
  plugins: [],
}
