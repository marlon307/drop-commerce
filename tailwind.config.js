/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    extend: {
      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-100vw)' }
        },
        dotbounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
            opacity: 0.4,
          },
          '20%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
            opacity: 1,
          },
        },
        menu: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          }
        }
      },
      animation: {
        carousel: 'marquee 25s linear infinite',
        bouncedot: '1s dotbounce infinite',
        'menu-right': '.2s menu linear',
      }
    },
  },
  plugins: [],
}

