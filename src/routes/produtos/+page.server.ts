import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProducts } from '$lib/shopify';

export const load: PageServerLoad = async ({ url }): Promise<{ products: IPoductCard[] }> => {
  const products = await getProducts(url.searchParams.get('q'));
  if (products) return { products };
  throw error(404, 'Not found');
};
