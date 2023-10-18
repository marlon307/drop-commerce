import type { LayoutServerLoad } from './$types';
import { getCustomerAccessToken } from '$lib/shopify';

export const load: LayoutServerLoad = async ({ cookies }): Promise<{ customer: ICustomer }> => {
  const customer = await getCustomerAccessToken(cookies.get('sessionid')!);

  if (customer.email) return { customer };

  return { customer: {} as ICustomer }
};
