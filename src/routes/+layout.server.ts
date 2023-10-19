import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }): Promise<{ customer: ICustomer }> => {
  return { customer: locals.customer };
};
