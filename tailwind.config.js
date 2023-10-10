/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        dotbounce:{
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
        }
      },
      animation: {
        carousel: 'marquee 60s linear infinite',
        bouncedot: 'dotbounce 1s infinite',
      }
    },
  },
  plugins: [],
}

