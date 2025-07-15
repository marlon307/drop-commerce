import { error, type Config } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { clientShopify, getRecommendations } from '$lib/shopify';
import { getProductByHandler } from '$lib/shopify/query/product';

export const config: Config = {
  runtime: 'edge',
};

export const load: PageServerLoad = async ({ params }) => {
  const resp = await clientShopify.request(getProductByHandler, {
    variables: {
      handle: params.handle
    },
  });
  // console.log(teste.data?.product?.media.edges);

  // const product = await getProductByHandle(params.handle);
  // console.log(product.variants);
  if (resp.data) return {
    product: resp.data.product,
    streamed: { recommendations: getRecommendations(resp.data.product?.id!) }
  };
  throw error(404, 'Not found');
};
