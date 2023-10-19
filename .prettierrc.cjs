module.exports = {
  pluginSearchDirs: false, // you can omit this when using Prettier version 3
  plugins: [require('prettier-plugin-svelte'),require('prettier-plugin-tailwindcss')],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],

  // Other prettier options here
};
