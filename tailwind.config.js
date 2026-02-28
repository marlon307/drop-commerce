/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".scrollbar-both-edges": {
          scrollbarGutter: "stable both-edges",
        },
      });
    },
  ],
};
