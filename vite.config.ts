import { sveltekit } from '@sveltejs/kit/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';
// import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		sveltekit(),
		// ViteImageOptimizer({
		// 	cache: true,
		// 	includePublic: true,
		// })
	]
});
