import { error, type Config } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProductByHandle, getRecommendations } from '$lib/shopify';

export const config: Config = {
  runtime: 'edge',
};

export const load: PageServerLoad = async ({ params }) => {
  const product = await getProductByHandle(params.handle);
  if (product) return {
    product,
    streamed: { recommendations: getRecommendations(product.id) }
  };
  throw error(404, 'Not found');
};
