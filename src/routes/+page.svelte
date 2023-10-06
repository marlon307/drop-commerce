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
			id: 7372452331703,
			title: "Produto teste",
			body_html:
				'<p><span data-mce-fragment="1">Descrição Teste</span></p>\n<p><span>Descrição Teste</span></p>\n<p><span>Descrição Teste</span></p>\n<p><span>Descrição Teste</span></p>',
			vendor: "virais shop",
			product_type: "",
			created_at: "2023-10-06T17:03:12-03:00",
			handle: "produto-teste",
			published_at: "2023-10-06T17:03:12-03:00",
			template_suffix: "",
			published_scope: "global",
			tags: "",
			status: "active",
			admin_graphql_api_id: "gid://shopify/Product/7372452331703",
			variants: [
				{
					id: 41940326580407,
					product_id: 7372452331703,
					title: "Default Title",
					price: "70.00",
					sku: "",
					position: 1,
					inventory_policy: "deny",
					compare_at_price: null,
					fulfillment_service: "manual",
					inventory_management: "shopify",
					option1: "Default Title",
					option2: null,
					option3: null,
					created_at: "2023-10-06T17:03:12-03:00",
					updated_at: "2023-10-06T17:37:32-03:00",
					taxable: true,
					barcode: "",
					grams: 600,
					image_id: null,
					weight: 0.6,
					weight_unit: "kg",
					inventory_item_id: 44035787620535,
					inventory_quantity: 50,
					old_inventory_quantity: 50,
					requires_shipping: true,
					admin_graphql_api_id: "gid://shopify/ProductVariant/41940326580407",
				},
			],
			options: [
				{
					id: 9484748390583,
					product_id: 7372452331703,
					name: "Title",
					position: 1,
					values: ["Default Title"],
				},
			],
			images: [
				{
					id: 33173712208055,
					product_id: 7372452331703,
					position: 1,
					created_at: "2023-10-06T17:03:14-03:00",
					updated_at: "2023-10-06T17:03:14-03:00",
					alt: null,
					width: 500,
					height: 500,
					src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/br-11134207-7r98o-lltaqaomufqj1d-removebg-preview.png?v=1696622594",
					variant_ids: [],
					admin_graphql_api_id: "gid://shopify/ProductImage/33173712208055",
				},
				{
					id: 33173712240823,
					product_id: 7372452331703,
					position: 2,
					created_at: "2023-10-06T17:03:14-03:00",
					updated_at: "2023-10-06T17:03:14-03:00",
					alt: null,
					width: 500,
					height: 500,
					src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/innovs-cable-iphone.png?v=1696622594",
					variant_ids: [],
					admin_graphql_api_id: "gid://shopify/ProductImage/33173712240823",
				},
			],
			image: {
				id: 33173712208055,
				product_id: 7372452331703,
				position: 1,
				created_at: "2023-10-06T17:03:14-03:00",
				updated_at: "2023-10-06T17:03:14-03:00",
				alt: null,
				width: 500,
				height: 500,
				src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/br-11134207-7r98o-lltaqaomufqj1d-removebg-preview.png?v=1696622594",
				variant_ids: [],
				admin_graphql_api_id: "gid://shopify/ProductImage/33173712208055",
			},
		},
		{
			id: 7372485984439,
			title: "Produto teste",
			body_html: "Produto teste",
			vendor: "virais shop",
			product_type: "",
			handle: "produto-teste-1",
			updated_at: "2023-10-06T18:14:39-03:00",
			published_at: "2023-10-06T18:14:32-03:00",
			template_suffix: "",
			published_scope: "global",
			tags: "",
			status: "active",
			admin_graphql_api_id: "gid://shopify/Product/7372485984439",
			variants: [
				{
					id: 41940588789943,
					product_id: 7372485984439,
					title: "Default Title",
					price: "60.00",
					sku: "",
					position: 1,
					inventory_policy: "deny",
					compare_at_price: null,
					fulfillment_service: "manual",
					inventory_management: "shopify",
					option1: "Default Title",
					option2: null,
					option3: null,
					created_at: "2023-10-06T18:14:32-03:00",
					updated_at: "2023-10-06T18:14:32-03:00",
					taxable: true,
					barcode: "",
					grams: 600,
					image_id: null,
					weight: 0.6,
					weight_unit: "kg",
					inventory_item_id: 44036049830071,
					inventory_quantity: 46,
					old_inventory_quantity: 46,
					requires_shipping: true,
					admin_graphql_api_id: "gid://shopify/ProductVariant/41940588789943",
				},
			],
			options: [
				{
					id: 9484786434231,
					product_id: 7372485984439,
					name: "Title",
					position: 1,
					values: ["Default Title"],
				},
			],
			images: [
				{
					id: 33173934309559,
					product_id: 7372485984439,
					position: 1,
					created_at: "2023-10-06T18:14:33-03:00",
					updated_at: "2023-10-06T18:14:33-03:00",
					alt: null,
					width: 500,
					height: 500,
					src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/innovs-cable-iphone_9f9459f3-7a1a-43e7-8938-440c6cf76dcb.png?v=1696626873",
					variant_ids: [],
					admin_graphql_api_id: "gid://shopify/ProductImage/33173934309559",
				},
				{
					id: 33173934342327,
					product_id: 7372485984439,
					position: 2,
					created_at: "2023-10-06T18:14:34-03:00",
					updated_at: "2023-10-06T18:14:34-03:00",
					alt: null,
					width: 500,
					height: 500,
					src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/br-11134207-7r98o-lltaqaomufqj1d-removebg-preview_d9336f84-b756-4e2a-a568-6bbc8c70cd86.png?v=1696626874",
					variant_ids: [],
					admin_graphql_api_id: "gid://shopify/ProductImage/33173934342327",
				},
			],
			image: {
				id: 33173934309559,
				product_id: 7372485984439,
				position: 1,
				created_at: "2023-10-06T18:14:33-03:00",
				updated_at: "2023-10-06T18:14:33-03:00",
				alt: null,
				width: 500,
				height: 500,
				src: "https://cdn.shopify.com/s/files/1/0617/5454/0215/files/innovs-cable-iphone_9f9459f3-7a1a-43e7-8938-440c6cf76dcb.png?v=1696626873",
				variant_ids: [],
				admin_graphql_api_id: "gid://shopify/ProductImage/33173934309559",
			},
		},
	]}
/>
