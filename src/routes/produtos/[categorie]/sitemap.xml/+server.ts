import { getProductsCollection } from "$lib/shopify";

export async function GET({ url, params, setHeaders }) {
	setHeaders({ "Content-Type": "application/xml" });
	const handleProducts = await getProductsCollection(params.categorie, "", false);

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
		>
			${handleProducts.products.map((product) => `
				<url>
					<loc>${url.origin}/produto/${product.handle}</loc>
					<lastmod>${new Date().toISOString()}</lastmod>
					<priority>1</priority>
				</url>
			`)}
		</urlset>`.trim().replaceAll(",", "")
	);
}
