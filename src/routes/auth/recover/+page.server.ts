
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { requestCustomerRecover } from "$lib/shopify";

const schema = z.object({
  email: z.string()
})

export const actions = {
  recover: async ({ request }) => {
    let data;
    try {

      const formData = await request.formData()
      data = schema.parse({
        email: formData.get('email'),
      });
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se todos os campos estão preenchidos.', fields: true });
    }

    await requestCustomerRecover(data.email);
    throw redirect(303, '/auth/login');
  }
};
