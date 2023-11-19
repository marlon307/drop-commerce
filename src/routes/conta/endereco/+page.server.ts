import type { PageServerLoad, Actions } from './$types';
import { deleteCustomerAddress, getCustomerAddress, updateCustomerAddress } from '$lib/shopify';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';

const schema = z.object({
  id: z.string(),
  name: z.string(),
  zip: z.string(),
  address1: z.string(),
  address2: z.string(),
  country: z.string(),
  province: z.string(),
  city: z.string(),
});

const schemaDel = z.object({
  id: z.string(),
});

export const actions = {
  saveAddress: async ({ request, cookies }) => {
    let data;
    try {
      const formdata = await request.formData();
      data = schema.parse({
        id: formdata.get("id"),
        name: formdata.get("name"),
        zip: formdata.get("zip"),
        address1: formdata.get("address1"),
        address2: formdata.get("address2"),
        country: formdata.get("country"),
        province: formdata.get("province"),
        city: formdata.get("city"),
      })
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const nameUser = data.name.split(' ');
    const dataAddress = await updateCustomerAddress(cookies.get('sessionid')!, data.id, {
      firstName: nameUser.shift() as string,
      lastName: nameUser.join(' '),
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      country: data.country,
      zip: data.zip,
      province: data.province,
    });

    if (!dataAddress.customerAddress?.zip) {
      return fail(400, { status: 400, message: 'Não foi possível salvar as alterações!', infoExists: true });
    }
    return { success: true };
  },
  deleteAddress: async ({ request, cookies }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schemaDel.parse({ id: formData.get("id") });
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const delInfoAddress = await deleteCustomerAddress(cookies.get("sessionid")!, data.id);
    if (!delInfoAddress.deletedCustomerAddressId) {
      return fail(400, { status: 400, message: 'Não foi possível excluir este endereço!', infoExists: true });
    }
    return { success: true };
  }
} satisfies Actions;

export const load: PageServerLoad = async ({ cookies }) => {
  const addresses = await getCustomerAddress(cookies.get('sessionid')!);
  return addresses;
};
