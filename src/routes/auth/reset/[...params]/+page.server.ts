import { clientShopify } from "$lib/shopify";
import { customerReset } from "$lib/shopify/mutation/customer";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z
  .object({
    password: z.string(),
    confirmpsw: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmpsw,
    "As senha não são iguais!",
  );

export const actions = {
  reset: async ({ request, params, cookies }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schema.parse({
        password: formData.get("password"),
        confirmpsw: formData.get("confirmpsw"),
      });
    } catch (error) {
      console.error(error);
      return fail(400, {
        status: 400,
        message: "Verifique se a senha está igual.",
        fields: true,
      });
    }

    const token = params.params.split("/");

    const accessToken = await clientShopify.request(customerReset, {
      variables: {
        id: `gid://shopify/Customer/${token[0]}`,
        input: {
          password: data.password,
          resetToken: token[1],
        },
      },
    });

    if (accessToken.errors) {
      return fail(400, {
        status: 400,
        message: accessToken.errors.graphQLErrors?.map((err) => err.message),
        tokenNotExist: true,
      });
    }

    cookies.set(
      "sessionid",
      accessToken.data?.customerReset?.customerAccessToken?.accessToken || "",
      {
        path: "/",
        expires: new Date(
          accessToken.data?.customerReset?.customerAccessToken?.expiresAt,
        ),
        priority: "high",
        httpOnly: true,
      },
    );

    throw redirect(303, "/conta");
  },
};
