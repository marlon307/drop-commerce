<script>
	import Header from "./Header.svelte";
	import "../app.css";
</script>

<div class="app px-4">
	<Header />
	<main class="max-w-screen-2xl mx-auto">
		<slot />
	</main>
	<footer>
		<p>
			visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
		</p>
	</footer>
</div>
