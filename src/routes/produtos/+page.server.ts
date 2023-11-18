import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/shopify';
import { sorting } from '$lib/constants';

export const load: PageServerLoad = async ({ url }) => {
  const valueOrder = sorting.find((itemOrder) => itemOrder.slug === url?.searchParams.get('o'));
  const products = await getProducts(url.searchParams.get('q')!, valueOrder?.sortKey, valueOrder?.reverse);
  if (products) return { products };
  throw error(404, 'Not found');
};
