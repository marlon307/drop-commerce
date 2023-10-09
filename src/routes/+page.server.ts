import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsCollection } from '$lib/shopify';

export const load: PageServerLoad = async (): Promise<{ products: IPoductCard[] }> => {
  const products = await getProductsCollection('hidden-home-page');
  if (products) return { products };
  throw error(404, 'Not found');
};
