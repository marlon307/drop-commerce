<script>
	import Header from "./Header.svelte";
	import "../app.css";
	export let data;
</script>

<div class="app px-4">
	<Header dataCart={data?.cart} />
	<main class="max-w-screen-2xl mx-auto">
		<slot />
	</main>
	<footer>
		<p>
			visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
		</p>
	</footer>
</div>
