import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCollections } from '$lib/shopify';

type Props = {
  collections: ICategorie[];
}

export const load: LayoutServerLoad = async (): Promise<Props> => {
  const collections = await getCollections();
  if (collections) return { collections };
  throw error(404, 'Not found');
};

