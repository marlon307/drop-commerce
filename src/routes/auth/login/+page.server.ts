/** @type {import('./$types').Actions} */

import { accessTokenCustomerCreate } from "$lib/shopify";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData()
    const data = schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const token = await accessTokenCustomerCreate({
      email: data.email,
      password: data.password,
    })

    cookies.set('sessionid', token.customerAccessToken.accessToken, { path: '/' });

    if (token.customerAccessToken.accessToken) {
      throw redirect(303, '/user');
    }

    return { success: true };
  }
};
