/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Dark palette ── */
        dark:         '#0A0B0D',   /* page background */
        darkCard:     '#111318',   /* card / panel surface */
        darkBorder:   '#1C1F27',   /* subtle border */
        /* ── Accent — emerald only ── */
        neon:         '#10B981',   /* actions, status, key metrics */
        neonBright:   '#10B981',   /* alias kept for legacy — same as neon */
        /* ── Typography ── */
        textPrimary:  '#F0F2F5',
        textSecondary:'#8B95A9',
        textMuted:    '#4D5568',
      },
      fontFamily: {
        sans:    ['Geist', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        /* Elevation — no colored glow */
        neon:       '0 2px 12px rgba(16, 185, 129, 0.20)',
        neonStrong: '0 4px 20px rgba(16, 185, 129, 0.18)',
        sm:         '0 1px 3px rgba(0,0,0,0.50)',
        md:         '0 4px 16px rgba(0,0,0,0.50)',
        lg:         '0 8px 40px rgba(0,0,0,0.60)',
      },
    },
  },
  plugins: [],
}
