import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        espresso:    '#14213D',   // Deep Navy — primary text
        'warm-dark': '#0A1628',   // Very dark navy — hero backgrounds
        terracotta:  '#C66A3D',   // Terracotta accent
        'burnt-clay':'#A85530',   // Darker terracotta
        cinnamon:    '#B06040',   // Mid terracotta
        copper:      '#D4A44B',   // Muted Gold — secondary accent
        // Backgrounds
        beige:       '#E8DFD0',   // Warm off-white card bg
        'beige-light':'#EDE8DF',  // Lighter card bg
        cream:       '#F7F3EC',   // Warm Cream — main background
        'cream-dark':'#F0EBE2',   // Slightly darker cream
        // Utility
        'warm-gray': '#6B7280',   // Supporting gray
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#14213D',
            a: { color: '#C66A3D' },
            'h1,h2,h3,h4': { fontFamily: 'var(--font-playfair)' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
