/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [({addUtilities})=> {
    addUtilities({
      ".scrollbar-both-edges": {
        scrollbarGutter: "stable both-edges"
      }
    })
  }],
}

