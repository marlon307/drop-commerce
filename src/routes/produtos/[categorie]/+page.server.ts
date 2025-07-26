import type { PageServerLoad } from './$types';
import { clientShopify } from '$lib/shopify';
import { getProductsCollectionQuery } from '$lib/shopify/query/product';
import type { ProductCollectionSortKeys } from '../../../@types/storefront.types';

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
  const sort = {
    "relevancia": "RELEVANCE",
    "lancamentos": "CREATED",
    "menor-preco": "PRICE",
    "maio-preco": "PRICE",
    "BestSelling": "BEST_SELLING",
  }[url?.searchParams.get('o')!] || 'RELEVANCE';

  setHeaders({
    'cache-control': 'public, max-age=3600, s-maxage=3600',
  });

  const resp = await clientShopify.request(getProductsCollectionQuery, {
    variables: {
      collection: params.categorie,
      reverse: sort === "menor-preco" ? false : sort === "menor-preco" ? true : null,
      sortKey: sort as ProductCollectionSortKeys,
    },
  });

  if (resp.data) return resp.data || [];
  return [];
};
