/** @type {import('./$types').Actions} */

import { fail, redirect } from '@sveltejs/kit';
import { z } from "zod";
import { accessTokenCustomerCreate } from "$lib/shopify";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export const actions = {
  login: async ({ request, cookies }) => {
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

    if (token.customerUserErrors.length) {
      return fail(400, { status: 400, message: token.customerUserErrors.map((err) => err.message), notUserExist: true });
    }

    cookies.set('sessionid', token.customerAccessToken.accessToken, {
      path: '/',
      expires: new Date(token.customerAccessToken.expiresAt),
      priority: 'high',
      httpOnly: true,
    });

    throw redirect(303, '/conta');
  }
};


