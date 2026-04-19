/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#060d1f',
          surface: '#0a1628',
          elevated: '#0f1e35',
          hover: '#162640',
        },
        border: {
          dim: '#1a3050',
          bright: '#1e4080',
        },
        accent: {
          teal: '#00e5c0',
          'teal-dim': '#00a88a',
          amber: '#f59e0b',
          blue: '#3b82f6',
          emerald: '#10b981',
          red: '#ef4444',
        },
        text: {
          primary: '#e8f0fe',
          secondary: '#94a3b8',
          dim: '#4a6080',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'wide': '0.15em',
        'tight-caps': '0.1em',
      }
    },
  },
  plugins: [],
}


