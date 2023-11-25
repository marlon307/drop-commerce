
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { requestCustomerReset } from "$lib/shopify";

const schema = z.object({
  password: z.string(),
  confirmpsw: z.string(),
}).refine((data) => data.password === data.confirmpsw, 'As senha não são iguais!');

export const actions = {
  reset: async ({ request, params, url }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schema.parse({
        password: formData.get('password'),
        confirmpsw: formData.get('confirmpsw'),
      });

    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }
    const values = params.params.split('/');
    console.log(values);

    await requestCustomerReset({
      id: '6585513541815',
      input: {
        password: '123456789',
        resetToken: '06a1079b-15d6-410e-9dbc-90cfbdca843f'
      }
    });
    // throw redirect(303, '/auth/reset/22');
  }
};
