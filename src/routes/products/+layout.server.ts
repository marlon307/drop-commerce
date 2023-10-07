import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { SHOPIFY_API_END_POINT, SHOPIFY_ACCESS_TOKEN } from '$env/static/private';

type Props = {
  data: ICategorie[];
}

export const load: LayoutServerLoad = async (): Promise<Props> => {
  const data = await fetch(`${SHOPIFY_API_END_POINT}/admin/api/2023-10/smart_collections.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    }
  })
  const collection = await data.json();

  if (collection) return collection;

  throw error(404, 'Not found');
};

