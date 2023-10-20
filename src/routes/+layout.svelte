<script>
  import Header from "./Header.svelte";
  import "../app.css";
</script>

<Header />
<main class="mx-auto min-h-screen max-w-screen-2xl">
  <slot />
</main>
<footer>
  <p>
    visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
  </p>
</footer>
