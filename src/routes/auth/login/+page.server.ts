/** @type {import('./$types').Actions} */

import { clientShopify } from "$lib/shopify";
import { customerAccessTokenCreate } from "$lib/shopify/mutation/customer";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export const actions = {
  login: async ({ request, cookies }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } catch (error) {
      console.error(error);
      return fail(400, {
        status: 400,
        message: "Verifique se todos os campos estão preenchidos.",
        fields: true,
      });
    }

    const token = await clientShopify.request(customerAccessTokenCreate, {
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
    });

    if (token.data?.customerAccessTokenCreate?.customerUserErrors?.length) {
      return fail(400, {
        status: 400,
        message: token.data.customerAccessTokenCreate.customerUserErrors.map(
          (err) => err.message,
        ),
        notUserExist: true,
      });
    }

    cookies.set(
      "sessionid",
      token.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken ||
        "",
      {
        path: "/",
        expires: new Date(
          token.data?.customerAccessTokenCreate?.customerAccessToken?.expiresAt,
        ),
        priority: "high",
        httpOnly: true,
      },
    );

    throw redirect(303, "/conta");
  },
};
