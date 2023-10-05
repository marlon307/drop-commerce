import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { USER_SECRET_KEY, USER_TOKEN, USER_ALIAS } from '$env/static/private';

export const load: PageServerLoad = async ({ params }): Promise<IPropsProducts> => {
  // const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/categories/${params.categorie}/products?include=firstImage.small,skus`, {
  //   headers: {
  //     'User-Token': USER_TOKEN,
  //     'User-Secret-Key': USER_SECRET_KEY,
  //   }
  // })
  const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/skus?include=firstImage`, {
    headers: {
      'User-Token': USER_TOKEN,
      'User-Secret-Key': USER_SECRET_KEY,
    }
  })

  const products = await data.json();
  if (products) return products;

  throw error(404, 'Not found');
};
