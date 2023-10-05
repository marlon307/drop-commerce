<script lang="ts">
	import image from "../lib/images/svelte-logo.svg";
	import Card from "../components/Product/Card.svelte";
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

<div class="w-full overflow-x-hidden pb-6 mt-8">
	<ul class="flex animate-carousel gap-4">
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
		<li class="w-full max-w-xs aspect-square flex-none">
			<Card />
		</li>
	</ul>
</div>
