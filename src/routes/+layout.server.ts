import type { LayoutServerLoad } from './$types';

type Props = {
  customer: ICustomer;
  collections: ICategorie[];
}

export const load: LayoutServerLoad = async ({ locals }): Promise<Props> => locals;
