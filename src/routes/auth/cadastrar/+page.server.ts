/** @type {import('./$types').Actions} */

import { clientShopify } from "$lib/shopify";
import {
  createCustomer,
  customerAccessTokenCreate,
} from "$lib/shopify/mutation/customer";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { Customer } from "../../../@types/storefront.types";

const schema = z
  .object({
    name: z.string(),
    tel: z.string(),
    email: z.email(),
    password: z.string(),
    confirmpsw: z.string(),
    acceptsMarketing: z.boolean(),
  })
  .refine(
    (data) => data.password === data.confirmpsw,
    "As senha não são iguais!",
  );

export const actions = {
  register: async ({ request, cookies, locals }) => {
    let data;
    try {
      const formData = await request.formData();
      data = schema.parse({
        email: formData.get("email"),
        name: formData.get("name"),
        tel: `+55${formData.get("tel")}`,
        password: formData.get("password"),
        confirmpsw: formData.get("confirmpsw"),
        acceptsMarketing: !!formData.get("prom_accept"),
      });
    } catch (error) {
      console.error(error);
      return fail(400, {
        status: 400,
        message: "Verifique se todos os campos estão preenchidos.",
        fields: true,
      });
    }

    const nameUser = data.name.split(" ");
    const dataCustomer = await clientShopify.request(createCustomer, {
      variables: {
        input: {
          firstName: nameUser.shift(),
          lastName: nameUser.join(" "),
          email: data.email,
          phone: data.tel,
          password: data.password,
          acceptsMarketing: data.acceptsMarketing,
        },
      },
    });

    if (dataCustomer.errors?.message) {
      return fail(400, {
        status: 400,
        message: dataCustomer.errors.graphQLErrors?.map((err) => err.message),
        infoExists: true,
      });
    }

    const token = await clientShopify.request(customerAccessTokenCreate, {
      variables: {
        input: {
          email: dataCustomer.data?.customerCreate?.customer?.email || "",
          password: data.password,
        },
      },
    });

    if (
      token.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken
    ) {
      locals.customer =
        (dataCustomer.data?.customerCreate?.customer as Customer) || null;
      cookies.set(
        "sessionid",
        token.data.customerAccessTokenCreate.customerAccessToken.accessToken,
        {
          path: "/",
          httpOnly: true,
        },
      );
      throw redirect(303, "/conta");
    }
    return { success: true };
  },
};
