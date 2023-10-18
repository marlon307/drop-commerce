import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }): Promise<{ customer: ICustomer }> => {
  if (locals.customer.email) return { customer: locals.customer };
  throw redirect(303, '/auth/login');
};
