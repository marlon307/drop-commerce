import { clientShopify } from "$lib/shopify";
import { customerRecover } from "$lib/shopify/mutation/customer";
import { fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  email: z.email().nonempty(),
});

export const actions: Actions = {
  recover: async ({ request }) => {
    let parse;
    try {
      const formData = await request.formData();
      parse = schema.parse({
        email: formData.get("email"),
      });
    } catch (error) {
      console.error(error);
      return fail(400, {
        status: 400,
        message: "Verifique se e-mail está correto.",
        fields: true,
      });
    }

    const recoverResp = await clientShopify.request(customerRecover, {
      variables: {
        email: parse.email,
      },
    });

    if (recoverResp?.errors) {
      return fail(400, {
        status: 400,
        message: recoverResp.errors.graphQLErrors?.map((err) => err.message),
        fields: true,
      });
    }
  },
};
