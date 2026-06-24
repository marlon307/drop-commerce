import { clientShopify } from "$lib/shopify";
import { customerAccessTokenCreate } from "$lib/shopify/mutation/customer";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { Actions } from "./$types";

const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export const actions: Actions = {
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

    const accessToken =
      token.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
    const expiresAt =
      token.data?.customerAccessTokenCreate?.customerAccessToken?.expiresAt;
    cookies.set("sessionid", accessToken || "", {
      path: "/",
      expires: expiresAt ? new Date(expiresAt) : undefined,
      priority: "high",
      httpOnly: true,
    });

    throw redirect(303, "/conta");
  },
};
