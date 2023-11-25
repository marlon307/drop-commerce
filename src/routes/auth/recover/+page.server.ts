
import { fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import { requestCustomerRecover } from "$lib/shopify";

const schema = z.object({
  email: z.string().email(),
})

export const actions: Actions = {
  recover: async ({ request }) => {
    let parse;
    try {
      const formData = await request.formData()
      parse = schema.parse({
        email: formData.get('email'),
      });
    } catch (error) {
      return fail(400, { status: 400, message: 'Verifique se e-mail está correto.', fields: true });
    }
    const recoverRep = await requestCustomerRecover(parse.email);
    if (recoverRep?.customerUserErrors.length) return fail(400, { status: 400, message: recoverRep.customerUserErrors[0].message, fields: true });
  }
};
