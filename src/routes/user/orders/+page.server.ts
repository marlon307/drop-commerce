import type { PageServerLoad } from './$types';
import { getCustomerOrders } from '$lib/shopify';

export const load: PageServerLoad = async ({ cookies }): Promise<{ orders: IOrder[] }> => {
  const orders = await getCustomerOrders(cookies.get('sessionid')!);
  return orders;
};
