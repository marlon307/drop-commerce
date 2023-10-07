import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductsSortKey } from "$lib/shopify";

export const load: PageServerLoad = async (): Promise<{ products: IPoductCard[] }> => {
  const products = await getProductsSortKey();
  if (products) return { products };
  throw error(404, 'Not found');
};
