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
			id: 159370635,
			product_id: 23331644,
			seller_id: null,
			sku: "67QZL57WB",
			token: "E7KQCB73NB",
			erp_id: null,
			blocked_sale: false,
			barcode: null,
			title: "Máquina de barbear alto desempenho",
			availability: 1,
			availability_soldout: -1,
			days_availability_formated: "1 dia útil",
			price_cost: 0,
			price_sale: 70,
			price_discount: 0,
			width: 12,
			height: 8,
			length: 15,
			weight: 0.7,
			quantity_managed: true,
			variations: [],
			combinations: "159370635",
			order: 0,
			total_in_stock: 50,
			total_orders: null,
			allow_sell_without_customization: false,
			image_reference_sku_id: null,
			purchase_url: "https://3072.pay.yampi.com.br/r/E7KQCB73NB",
			created_at: {
				date: "2023-10-05 08:33:25.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			updated_at: {
				date: "2023-10-06 09:51:29.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			customizations: {
				data: [],
			},
			firstImage: {
				data: {
					id: 1494824710,
					processed: true,
					name: "produto-teste-651e9f05e114f",
					order: 0,
					extension: "png",
					filter_image_url: null,
					small: {
						width: 50,
						height: 50,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-small.png",
					},
					thumb: {
						width: 250,
						height: 250,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-thumb.png",
					},
					medium: {
						width: 500,
						height: 500,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-medium.png",
					},
					large: {
						width: 1000,
						height: 1000,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/produto-teste-651e9f05e114f-large.png",
					},
				},
			},
		},
		{
			id: 159578002,
			product_id: 23369532,
			seller_id: null,
			sku: "ZLRAYZQ8J",
			token: "7DO25ADXA6",
			erp_id: null,
			blocked_sale: false,
			barcode: null,
			title: "Cabo carredaor USB-C",
			availability: 1,
			availability_soldout: -1,
			days_availability_formated: "1 dia útil",
			price_cost: 0,
			price_sale: 32,
			price_discount: 0,
			width: 12,
			height: 5,
			length: 10,
			weight: 0.7,
			quantity_managed: true,
			variations: [],
			combinations: "159578002",
			order: 0,
			total_in_stock: 50,
			total_orders: null,
			allow_sell_without_customization: false,
			image_reference_sku_id: null,
			purchase_url: "https://3072.pay.yampi.com.br/r/7DO25ADXA6",
			created_at: {
				date: "2023-10-05 19:09:54.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			updated_at: {
				date: "2023-10-06 10:06:11.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			customizations: {
				data: [],
			},
			firstImage: {
				data: {
					id: 1496186242,
					processed: true,
					name: "cao-carredaor-iphone-651f353626e75",
					order: 0,
					extension: "png",
					filter_image_url: null,
					small: {
						width: 50,
						height: 50,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cao-carredaor-iphone-651f353626e75-small.png",
					},
					thumb: {
						width: 250,
						height: 250,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cao-carredaor-iphone-651f353626e75-thumb.png",
					},
					medium: {
						width: 500,
						height: 500,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cao-carredaor-iphone-651f353626e75-medium.png",
					},
					large: {
						width: 1000,
						height: 1000,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cao-carredaor-iphone-651f353626e75-large.png",
					},
				},
			},
		},
		{
			id: 159579586,
			product_id: 23369687,
			seller_id: null,
			sku: "ZSS34W7NK",
			token: "129OUND98C",
			erp_id: null,
			blocked_sale: false,
			barcode: null,
			title: "Cabo carredaor iPhone",
			availability: 1,
			availability_soldout: -1,
			days_availability_formated: "1 dia útil",
			price_cost: 0,
			price_sale: 35.4,
			price_discount: 0,
			width: 10,
			height: 5,
			length: 12,
			weight: 0.7,
			quantity_managed: true,
			variations: [],
			combinations: "159579586",
			order: 0,
			total_in_stock: 50,
			total_orders: null,
			allow_sell_without_customization: false,
			image_reference_sku_id: null,
			purchase_url: "https://3072.pay.yampi.com.br/r/129OUND98C",
			created_at: {
				date: "2023-10-05 19:17:51.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			updated_at: {
				date: "2023-10-06 10:03:23.000000",
				timezone_type: 3,
				timezone: "America/Sao_Paulo",
			},
			customizations: {
				data: [],
			},
			firstImage: {
				data: {
					id: 1496194661,
					processed: true,
					name: "cabo-carredaor-iphone-651f3697833b0",
					order: 0,
					extension: "png",
					filter_image_url: null,
					small: {
						width: 50,
						height: 50,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cabo-carredaor-iphone-651f3697833b0-small.png",
					},
					thumb: {
						width: 250,
						height: 250,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cabo-carredaor-iphone-651f3697833b0-thumb.png",
					},
					medium: {
						width: 500,
						height: 500,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cabo-carredaor-iphone-651f3697833b0-medium.png",
					},
					large: {
						width: 1000,
						height: 1000,
						url: "https://images.yampi.me/assets/stores/3072/uploads/images/cabo-carredaor-iphone-651f3697833b0-large.png",
					},
				},
			},
		},
	]}
/>
