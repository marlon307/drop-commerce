import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (locals.customer?.email && !['/auth/recover', '/auth/reset'].includes(url.pathname))
    throw redirect(303, '/');
};
