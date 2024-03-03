// https://blog.logrocket.com/how-to-use-tailwind-css-svelte/
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'
import autoprefixer from 'autoprefixer'
export default {
    plugins: [
      tailwind(tailwindConfig),
      autoprefixer,
    ]
}
