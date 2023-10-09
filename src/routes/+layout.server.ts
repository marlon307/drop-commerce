import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCartId } from '$lib/shopify';

export const load: LayoutServerLoad = async ({ cookies }): Promise<{ cart: ICart }> => {
  const cart = await getCartId(cookies.get('cart')!);
  if (cart) return { cart };
  throw error(404, 'Not found');
};

