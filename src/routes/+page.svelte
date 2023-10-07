<script lang="ts">
	import image from "../lib/images/svelte-logo.svg";
	import Card from "../components/Product/Card.svelte";
	import Carrousel from "../components/Carrousel/index.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid md:grid-cols-6 md:grid-rows-2 gap-4">
	<div class="w-full md:col-span-4 row-span-2 h-full">
		<a
			href="/"
			class="relative block aspect-square h-full w-full bg-neutral-950 rounded-lg group hover:border-orange-500 border border-neutral-700 transition-colors"
		>
			<figure class="h-full flex p-6">
				<img
					src={image}
					alt="Produt Title"
					class="object-fill m-auto w-full h-full group-hover:scale-105 transition-transform"
					width="400"
					height="400"
				/>
				<figcaption class="absolute px-4 bottom-1/4 left-0">
					<div
						class="flex items-center rounded-full border bg-neutral-950/70 p-1 font-semibol backdrop-blur-md dark:border-neutral-800 text-white gap-2"
					>
						<span
							class="line-clamp-2 flex-grow pl-2 leading-none tracking-tight text-xs"
						>
							Teste nome produto
						</span>
						<span class="bg-orange-400 px-4 py-2 rounded-3xl flex-none"
							>{(20).toLocaleString("pt-BR", {
								style: "currency",
								currency: "BRL",
							})}</span
						>
					</div>
				</figcaption>
			</figure>
		</a>
	</div>
	<div class="w-full md:col-span-2 md:row-span-1">
		<Card />
	</div>
	<div class="w-full md:col-span-2 md:row-span-1">
		<Card />
	</div>
</section>

<Carrousel
	arrayContent={[
		{
			handle: "produto-teste",
			title: "Produto teste",
			image: {
				transformedSrc:
					"https://cdn.shopify.com/s/files/1/0617/5454/0215/files/br-11134207-7r98o-lltaqaomufqj1d-removebg-preview.png?v=1696622594",
				width: 500,
				height: 500,
			},
			price: 70,
		},
		{
			handle: "produto-teste-1",
			title: "Produto teste",
			image: {
				transformedSrc:
					"https://cdn.shopify.com/s/files/1/0617/5454/0215/files/innovs-cable-iphone_9f9459f3-7a1a-43e7-8938-440c6cf76dcb.png?v=1696626873",
				width: 500,
				height: 500,
			},
			price: 60,
		},
		{
			handle: "maquina-de-cortar-cabelo-alto-desempenho",
			title: "Maquina de cortar cabelo alto desempenho",
			image: {
				transformedSrc:
					"https://cdn.shopify.com/s/files/1/0617/5454/0215/files/produto-teste-651e9f05e114f-thumb.webp?v=1696676688",
				width: 290,
				height: 290,
			},
			price: 76,
		},
	]}
/>
