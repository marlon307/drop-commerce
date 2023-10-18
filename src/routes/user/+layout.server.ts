import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCustomerAccessToken } from '$lib/shopify';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const customer = await getCustomerAccessToken(cookies.get('sessionid')!);

  if (customer.email) {
    customer.firstName = `${customer.firstName} ${customer.lastName}`
    return { customer };
  }
  throw redirect(303, '/auth/login');
};
