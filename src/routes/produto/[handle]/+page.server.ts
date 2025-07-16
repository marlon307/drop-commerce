import { error, type Config } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { clientShopify, getRecommendations } from '$lib/shopify';
import { getProductByHandler, productRecommendations } from '$lib/shopify/query/product';
import type { ProductRecommendationsQuery } from '../../../@types/storefront.generated';

export const config: Config = {
  runtime: 'edge',
};

export const load: PageServerLoad = async ({ params }) => {
  const resp = await clientShopify.request(getProductByHandler, {
    variables: {
      handle: params.handle
    },
  });

  if (resp.data) return {
    product: resp.data.product,
    streamed: {
      recommendations: new Promise<ProductRecommendationsQuery["productRecommendations"]>(async (resolve, reject) => {
        try {
          const recommendations = await clientShopify.request(productRecommendations, {
            variables: {
              productId: resp.data?.product?.id!
            },
          });
          resolve(recommendations?.data?.productRecommendations || [])
        } catch (error) {
          reject([])
        }
      })
    }
  };
  throw error(404, 'Not found');
};
