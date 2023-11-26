import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsCollection } from '$lib/shopify';
import { sorting } from '$lib/constants';

export const load: PageServerLoad = async ({ params, url }) => {
  const valueOrder = sorting.find((itemOrder) => itemOrder.slug === url?.searchParams.get('o'));
  const handleProducts = await getProductsCollection(params.categorie, valueOrder?.sortKey, valueOrder?.reverse);
  if (handleProducts) return handleProducts;
  throw error(404, 'Not found');
};
