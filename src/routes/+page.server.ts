import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsCollection } from '$lib/shopify';

export const config = {
  runtime: "edge"
};

export const prerender = true;

export const load: PageServerLoad = async () => {
  const productshome = await getProductsCollection('hidden-home-page', 'MANUAL');
  if (productshome) return productshome;
  throw error(404, 'Not found');
};
