import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso:    '#6B3520',
        'warm-dark': '#3D1C0A',
        terracotta:  '#B84A2E',
        'burnt-clay':'#9B4520',
        cinnamon:    '#A05530',
        copper:      '#B87B4F',
        beige:       '#E8D5C0',
        'beige-light':'#F0E5D8',
        cream:       '#FAF7F2',
        'cream-dark':'#F2EBE0',
        'warm-gray': '#8A7B72',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2C1810',
            a: { color: '#B84A2E' },
            'h1,h2,h3,h4': { fontFamily: 'var(--font-playfair)' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
