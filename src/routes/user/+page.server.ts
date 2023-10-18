import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCustomerAccessToken } from '$lib/shopify';

export const load: PageServerLoad = async ({ cookies }) => {
  const customer = await getCustomerAccessToken(cookies.get('sessionid')!);

  if (customer.email) {
    customer.firstName = `${customer.firstName} ${customer.lastName}`
    return { customer };
  }
  throw error(401, 'Not Authorized.');
};
