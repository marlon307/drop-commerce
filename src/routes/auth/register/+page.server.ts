/** @type {import('./$types').Actions} */

import { accessTokenCustomerCreate, registerCustomer } from "$lib/shopify";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  tel: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmpsw: z.string(),
  acceptsMarketing: z.boolean()
}).refine((data) => data.password === data.confirmpsw, 'As senha não são iguais!')

export const actions = {
  register: async ({ request, cookies }) => {
    const formData = await request.formData()
    const data = schema.parse({
      email: formData.get('email'),
      name: formData.get('name'),
      tel: formData.get('tel'),
      password: formData.get('password'),
      confirmpsw: formData.get('confirmpsw'),
      acceptsMarketing: !!formData.get('prom_accept')
    });

    const nameUser = data.name.split(' ');
    const dataCustomer = await registerCustomer({
      firstName: nameUser.shift(),
      lastName: nameUser.join(' '),
      email: data.email,
      phone: data.tel,
      password: data.password,
      acceptsMarketing: data.acceptsMarketing
    });

    const token = await accessTokenCustomerCreate({
      email: dataCustomer?.customer.email,
      password: data.password,
    })

    cookies.set('sessionid', token.customerAccessToken.accessToken, { path: '/' });
    if (dataCustomer?.customer.email) {
      throw redirect(303, '/user');
    }

    return { success: true };
  }
};
