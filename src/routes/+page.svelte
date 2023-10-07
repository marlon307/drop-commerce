<script lang="ts">
	import Card from "../components/Product/Card.svelte";
	import Carrousel from "../components/Carrousel/index.svelte";
	export let data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid md:grid-cols-6 md:grid-rows-2 gap-4">
	<div class="w-full md:col-span-4 row-span-2 h-full">
		<Card productProps={data.products[1]} bigCard />
	</div>
	<div class="w-full md:col-span-2 md:row-span-1">
		<Card productProps={data.products[0]} />
	</div>
	<div class="w-full md:col-span-2 md:row-span-1">
		<Card productProps={data.products[1]} />
	</div>
</section>

<Carrousel arrayContent={data.products} />
