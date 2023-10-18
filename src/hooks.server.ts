import { getCustomerAccessToken } from '$lib/shopify';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.customer = await getCustomerAccessToken(event.cookies.get('sessionid')!);
  return await resolve(event);
};
