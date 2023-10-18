import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }): Promise<{ customer: ICustomer }> => {
  if (locals.customer) return { customer: locals.customer };
  return { customer: {} as ICustomer }
};