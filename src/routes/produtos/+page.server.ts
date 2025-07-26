import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { clientShopify } from '$lib/shopify';
import { getProductsQuery } from '$lib/shopify/query/product';
import type { ProductSortKeys } from '../../@types/storefront.types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  const sort = {
    "relevancia": "RELEVANCE",
    "lancamentos": "CREATED_AT",
    "menor-preco": "PRICE",
    "maio-preco": "PRICE",
    "BestSelling": "BEST_SELLING",
  }[url?.searchParams.get('o')!] || 'RELEVANCE';

  setHeaders({
    'cache-control': 'public, max-age=3600, s-maxage=3600',
  });

  const resp = await clientShopify.request(getProductsQuery, {
    variables: {
      query: url.searchParams.get('q') || '',
      reverse: sort === "menor-preco" ? false : sort === "menor-preco" ? true : null,
      sort: sort as ProductSortKeys,
    },
  });

  if (resp.data) return { products: resp.data?.products?.edges || [] };
  throw error(404, 'Not found');
};
