import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (locals.customer.email && url.pathname !== '/auth/reset')
    throw redirect(303, '/');
};
