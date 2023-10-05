import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { USER_SECRET_KEY, USER_TOKEN, USER_ALIAS } from '$env/static/private';

export const load: PageServerLoad = async ({ params }): Promise<IProduct> => {
  if (params.id) {
    const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/products/${params.id}?include=skus,images`, {
      headers: {
        'User-Token': USER_TOKEN,
        'User-Secret-Key': USER_SECRET_KEY,
      }
    })
    const product = await data.json();
    return product.data;
  }

  throw error(404, 'Not found');
};
