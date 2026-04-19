/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#f4f6f9',
        'bg-card': '#ffffff',
        'bg-dark': '#0f1929',
        'bg-dark-card': '#162035',
        'navy': '#1a2f5a',
        'navy-light': '#2d4a7a',
        'gold': '#c9a84c',
        'gold-light': '#f0d078',
        'crimson': '#c0392b',
        'emerald': '#1a7a4a',
        'amber': '#d68910',
        'steel': '#6c7a8d',
        'border': '#dde3ed',
        'border-dark': '#c5cdd8',
        'cand-a': '#1a4fa0',
        'cand-b': '#c0392b',
        'cand-c': '#1a7a4a',
        'cand-d': '#7b3fa0',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'premium': '0 1px 4px rgba(0,0,0,0.06)',
        'hero': '0 8px 32px rgba(0,0,0,0.2)',
      }
    },
  },
  plugins: [],
}
