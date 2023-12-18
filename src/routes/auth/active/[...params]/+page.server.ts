
import { activeAccountCustomer } from "$lib/shopify";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  password: z.string(),
  confirmpsw: z.string(),
}).refine((data) => data.password === data.confirmpsw, 'As senha não são iguais!');

export const actions = {
  active: async ({ request, params, cookies }) => {
    let fields;
    try {
      const formData = await request.formData();
      fields = schema.parse({
        password: formData.get('password'),
        confirmpsw: formData.get('confirmpsw'),
      });

    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se a senha está igual.', fields: true });
    }

    const token = params.params.split('/');

    const dataActive = await activeAccountCustomer({
      id: `gid://shopify/Customer/${token[0]}`,
      input: {
        password: fields.password,
        activationToken: token[1]
      }
    });

    if (!dataActive.data.customerAccessToken) {
      return fail(400, {
        status: 400,
        message: dataActive.errors.map((err) => err.message),
        tokenNotExist: true
      });
    }

    cookies.set('sessionid', dataActive.data.customerAccessToken.accessToken, {
      path: '/',
      expires: new Date(dataActive.data.customerAccessToken.expiresAt),
      priority: 'high',
      httpOnly: true,
    });

    throw redirect(303, '/conta');
  }
};
