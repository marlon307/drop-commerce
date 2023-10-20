import type { PageServerLoad } from './$types';
import { getCustomerAddress } from '$lib/shopify';

export const load: PageServerLoad = async ({ cookies }): Promise<{ addresses: IAddress[] }> => {
  const addresses = await getCustomerAddress(cookies.get('sessionid')!);
  return addresses;
};
