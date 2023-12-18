/** @type {import('./$types').Actions} */

import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { accessTokenCustomerCreate, registerCustomer } from "$lib/shopify";

const schema = z.object({
  name: z.string(),
  tel: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmpsw: z.string(),
  acceptsMarketing: z.boolean()
}).refine((data) => data.password === data.confirmpsw, 'As senha não são iguais!');

export const actions = {
  register: async ({ request, cookies, locals }) => {
    let data;
    try {
      const formData = await request.formData()
      data = schema.parse({
        email: formData.get('email'),
        name: formData.get('name'),
        tel: `+55${formData.get('tel')}`,
        password: formData.get('password'),
        confirmpsw: formData.get('confirmpsw'),
        acceptsMarketing: !!formData.get('prom_accept')
      });
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const nameUser = data.name.split(' ');
    const dataCustomer = await registerCustomer({
      firstName: nameUser.shift(),
      lastName: nameUser.join(' '),
      email: data.email,
      phone: data.tel,
      password: data.password,
      acceptsMarketing: data.acceptsMarketing
    });

    if (dataCustomer.customerUserErrors.length) {
      return fail(400, { status: 400, message: dataCustomer.customerUserErrors.map((err) => err.message), infoExists: true });
    }

    const token = await accessTokenCustomerCreate({
      email: dataCustomer.customer.email,
      password: data.password,
    });

    if (token.customerAccessToken.accessToken) {
      locals.customer = dataCustomer.customer;
      cookies.set('sessionid', token.customerAccessToken.accessToken, { path: '/', httpOnly: true, });
      throw redirect(303, '/conta');
    }
    return { success: true };
  }
};
