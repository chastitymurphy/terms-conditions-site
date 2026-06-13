import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds (hero, footer, newsletter)
        espresso:    '#2B3A52',   // Deep slate blue — primary text
        'warm-dark': '#1A2B42',   // Muted navy — hero / dark sections
        // Accents
        terracotta:  '#C4623A',   // Terracotta
        'burnt-clay':'#A8522E',   // Darker terracotta (hover states)
        cinnamon:    '#A05A3A',   // Mid terracotta
        copper:      '#D4A84B',   // Warm gold
        rose:        '#C4847A',   // Dusty rose
        // Warm neutral backgrounds
        beige:       '#E6D9C4',   // Light sand
        'beige-light':'#EDE5D8',  // Between sand and oatmeal
        cream:       '#FAF7F0',   // Soft cream — main background
        'cream-dark':'#F2E8D6',   // Warm oatmeal — section backgrounds
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
            color: '#2B3A52',
            a: { color: '#C4623A' },
            'h1,h2,h3,h4': { fontFamily: 'var(--font-playfair)' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
