import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsCollection } from '$lib/shopify';

export const load: PageServerLoad = async () => {
  const productshome = await getProductsCollection('hidden-home-page', 'RELEVANCE');
  if (productshome) return productshome;
  throw error(404, 'Not found');
};
