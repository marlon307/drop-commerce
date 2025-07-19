import { clientShopify } from "$lib/shopify";
import { customerUpdate } from "$lib/shopify/mutation/customer.js";
import { fail, redirect } from '@sveltejs/kit';
import { z } from "zod";

const schema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  tel: z.string().nonempty(),
  acceptsMarketing: z.boolean(),
});

export const actions = {
  user: async ({ request, cookies }) => {
    const formData = await request.formData();
    const { data, success } = schema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      tel: `${formData.get('tel')}`.replace(/\D/g, ""),
      acceptsMarketing: !!formData.get('prom_accept')
    });

    if (success === false) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const nameUser = data.name.split(' ');
    const respUpdate = await clientShopify.request(customerUpdate, {
      variables: {
        token: cookies.get('sessionid')!,
        customer: {
          firstName: nameUser.shift(),
          lastName: nameUser.join(' '),
          email: data.email,
          phone: `+55${data.tel}`,
          acceptsMarketing: data.acceptsMarketing
        }
      }
    });

    if (respUpdate.data?.customerUpdate?.customerUserErrors) {
      return fail(400, {
        status: 400, message: respUpdate.data?.customerUpdate?.customerUserErrors.reduce((acc, err) => ({
          ...acc,
          [err.field![1]]: err.message,
        }), {}), fields: true
      });
    }
    if (respUpdate.errors) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    if (respUpdate?.data?.customerUpdate?.customerAccessToken) {
      cookies.set('sessionid', respUpdate?.data?.customerUpdate.customerAccessToken?.accessToken, { path: '/', httpOnly: true, });
      throw redirect(303, '/conta');
    }

    return { success: true };
  }
};
