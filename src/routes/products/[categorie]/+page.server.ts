import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { USER_SECRET_KEY, USER_TOKEN, USER_ALIAS } from '$env/static/private';

export const load: PageServerLoad = async ({ params }): Promise<IPropsProducts> => {
  // const data1 = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/products?category_name=Mulher`, {
  //   headers: {
  //     'User-Token': USER_TOKEN,
  //     'User-Secret-Key': USER_SECRET_KEY,
  //   }
  // })
  // const productss = await data1.json();
  // console.log(productss.data, new Date());
  console.log(params);

  const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/skus?include=firstImage,products`, {
    headers: {
      'User-Token': USER_TOKEN,
      'User-Secret-Key': USER_SECRET_KEY,
    }
  })

  const products = await data.json();
  // console.log(products.data[0], new Date());

  if (products) return products;

  throw error(404, 'Not found');
};
