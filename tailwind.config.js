/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0a',
        darkCard: '#111111',
        darkBorder: '#1e1e1e',
        neon: '#10b981',
        neonBright: '#00ff87',
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8',
        textMuted: '#94a3b8',
      },
      fontFamily: {
        sans: ['Geist', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 15px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.1)',
        neonStrong: '0 0 20px rgba(0, 255, 135, 0.4), 0 0 40px rgba(0, 255, 135, 0.15)',
      },
    },
  },
  plugins: [],
}
