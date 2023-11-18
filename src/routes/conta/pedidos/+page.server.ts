import type { PageServerLoad } from './$types';
import { getCustomerOrders } from '$lib/shopify';

export const load: PageServerLoad = async ({ cookies }) => {
  const orders = await getCustomerOrders(cookies.get('sessionid')!);
  return orders;
};
