import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_END_POINT } from '$env/static/private';

export const load: PageServerLoad = async ({ params }) => {
  if (params.id) {
    const data = await fetch(`${SHOPIFY_API_END_POINT}/admin/api/2023-10/products.json?handle=${params.id}&limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      }
    })
    const resp = await data.json();
    if (resp?.products) return { product: resp?.products[0] };
  }

  throw error(404, 'Not found');
};
