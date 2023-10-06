import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { USER_SECRET_KEY, USER_TOKEN, USER_ALIAS } from '$env/static/private';

type Props = {
  data: IProducts[];
}

export const load: LayoutServerLoad = async ({ params }): Promise<Props> => {
  if (params.id) {
    const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/skus?include=firstImage,products`, {
      headers: {
        'User-Token': USER_TOKEN,
        'User-Secret-Key': USER_SECRET_KEY,
      }
    })
    const product = await data.json();
    return product;
  }

  throw error(404, 'Not found');
};
