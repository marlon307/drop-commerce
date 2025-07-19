import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { clientShopify } from '$lib/shopify';
import { getProductsCollectionQuery } from '$lib/shopify/query/product';
import type { ProductCollectionSortKeys } from '../@types/storefront.types';

export const config = {
  runtime: "edge"
};

export const load: PageServerLoad = async () => {
  const resp = await clientShopify.request(getProductsCollectionQuery, {
    variables: {
      collection: 'hidden-home-page',
      sortKey: 'MANUAL' as ProductCollectionSortKeys, // Assuming 'MANUAL' is a valid sort key
    },
  });

  if (resp.data) return resp.data;
  throw error(404, 'Not found');
};
