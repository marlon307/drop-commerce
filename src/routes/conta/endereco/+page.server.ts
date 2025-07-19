import type { PageServerLoad, Actions } from './$types';
import { clientShopify } from '$lib/shopify';
import { z } from 'zod';
import { queryCustomerAddress } from '$lib/shopify/query/customer';
import { customerAddressDelete, customerAddressUpdate } from '$lib/shopify/mutation/address';
import { fail } from '@sveltejs/kit';

const schema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  zip: z.string().nonempty(),
  address1: z.string().nonempty(),
  address2: z.string().nonempty(),
  country: z.string().nonempty(),
  province: z.string().nonempty(),
  city: z.string().nonempty(),
});

const schemaDel = z.object({
  id: z.string(),
});

export const actions = {
  saveAddress: async ({ request, cookies }) => {
    const formdata = await request.formData();
    const respData = schema.safeParse(Object.fromEntries(formdata));

    if (respData.success === false) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const { id: idAddress, name, ...data } = respData.data;
    const nameUser = name.split(' ');
    const dataAddress = await clientShopify.request(customerAddressUpdate, {
      variables: {
        idAddress,
        token: cookies.get('sessionid')!,
        dataAddress: {
          ...data,
          firstName: nameUser[0],
          lastName: nameUser[1],
        },
      }
    });

    if (dataAddress.errors?.message) {
      return fail(400, { status: 400, message: 'Não foi possível salvar as alterações!', infoExists: true });
    }
    return { success: true };
  },
  deleteAddress: async ({ request, cookies }) => {
    const formData = await request.formData();
    const dataParse = schemaDel.safeParse({ id: formData.get("id") });

    if (dataParse.success === false) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const delInfoAddress = await clientShopify.request(customerAddressDelete, {
      variables: {
        idAddress: dataParse.data.id,
        token: cookies.get("sessionid")!,
      }
    });

    if (delInfoAddress.errors?.message) {
      return fail(400, { status: 400, message: 'Não foi possível excluir este endereço!', infoExists: true });
    }
    return { success: true };
  }
} satisfies Actions;

export const load: PageServerLoad = async ({ cookies }) => {
  const address = await clientShopify.request(queryCustomerAddress, {
    variables: {
      token: cookies.get('sessionid')!,
    }
  });

  return {
    address: address.data?.customer?.addresses.edges
  };
};
