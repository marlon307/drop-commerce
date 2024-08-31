import type { PageServerLoad } from './$types';
import { getProductsCollection, type Sort } from '$lib/shopify';
import { sorting } from '$lib/constants';

export const load: PageServerLoad = async ({ params, url }) => {
  const valueOrder = sorting.find((itemOrder) => itemOrder.slug === url?.searchParams.get('o'));
  const handleProducts = await getProductsCollection(params.categorie, valueOrder?.sortKey as Sort, valueOrder?.reverse);

  if (handleProducts) return handleProducts;
  return [];
};
