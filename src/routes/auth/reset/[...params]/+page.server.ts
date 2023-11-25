
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { requestCustomerReset } from "$lib/shopify";

const schema = z.object({
  password: z.string(),
  confirmpsw: z.string(),
}).refine((data) => data.password === data.confirmpsw, 'As senha não são iguais!');

export const actions = {
  reset: async ({ request, params, cookies }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schema.parse({
        password: formData.get('password'),
        confirmpsw: formData.get('confirmpsw'),
      });

    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se a senha está igual.', fields: true });
    }

    const token = params.params.split('/');
    const accessToken = await requestCustomerReset({
      id: `gid://shopify/Customer/${token[0]}`,
      input: {
        password: data.password,
        resetToken: token[1]
      }
    });

    if (!accessToken.customerAccessToken?.accessToken) {
      return fail(400, { status: 400, message: 'Token não existe!', tokenNotExist: true });
    }

    cookies.set('sessionid', accessToken.customerAccessToken.accessToken, {
      path: '/',
      expires: new Date(accessToken.customerAccessToken.expiresAt),
      priority: 'high',
    });

    throw redirect(303, '/conta');
  }
};
