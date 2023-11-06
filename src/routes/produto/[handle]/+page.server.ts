import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductByHandle } from '$lib/shopify';

export const load: PageServerLoad = async ({ params }): Promise<{ product: IPorduct }> => {
  const product = await getProductByHandle(params.handle);
  if (product) return { product };
  throw error(404, 'Not found');
};
