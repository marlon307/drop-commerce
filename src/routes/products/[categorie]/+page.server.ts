import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsCollection } from '$lib/shopify';

export const load: PageServerLoad = async ({ params }): Promise<{ products: IPoductCard[] }> => {
  const products = await getProductsCollection(params.categorie);
  if (products) return { products };

  throw error(404, 'Not found');
};
