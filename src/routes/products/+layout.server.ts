import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { USER_SECRET_KEY, USER_TOKEN, USER_ALIAS } from '$env/static/private';

type Props = {
  data: ICategorie[];
}

export const load: LayoutServerLoad = async (): Promise<Props> => {
  const data = await fetch(`https://api.dooki.com.br/v2/${USER_ALIAS}/catalog/categories`, {
    headers: {
      'User-Token': USER_TOKEN,
      'User-Secret-Key': USER_SECRET_KEY,
    }
  })
  const categories = await data.json();

  if (categories) return categories;

  throw error(404, 'Not found');
};

