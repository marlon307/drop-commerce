/** @type {import('./$types').Actions} */

import { fail, redirect } from '@sveltejs/kit';
import { z } from "zod";
import { accessTokenCustomerCreate } from "$lib/shopify";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const actions = {
  login: async ({ request, cookies, locals }) => {
    let data;
    try {
      const formData = await request.formData()
      data = schema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      });
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    const token = await accessTokenCustomerCreate({
      email: data.email,
      password: data.password,
    });

    if (!token.customerAccessToken) {
      return fail(400, { status: 400, message: 'Senha incorreta ou usuário não existe.', notUserExist: true });
    }

    cookies.set('sessionid', token.customerAccessToken.accessToken, {
      path: '/',
      expires: new Date(token.customerAccessToken.expiresAt),
      priority: 'high',
    });
    locals.customer = {
      email: "sdsds",
      acceptsMarketing: true,
      firstName: '',
      lastName: '',
      phone: ""
    }
    throw redirect(303, '/user');
  }
};
