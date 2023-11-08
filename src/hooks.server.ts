import type { Handle } from '@sveltejs/kit';
import { getCustomerAccessToken } from '$lib/shopify';

export const handle: Handle = async ({ event, resolve }) => {
  const data = await getCustomerAccessToken(event.cookies.get('sessionid')!);
  event.locals.customer = data?.customer;
  event.locals.collections = data?.collections.filter((collection: ICategorie) => !collection.title.startsWith('hidden') || !collection.handle.startsWith('hidden')) || [];
  return await resolve(event);
};
