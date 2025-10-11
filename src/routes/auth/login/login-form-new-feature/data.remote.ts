import { form, getRequestEvent } from "$app/server";
import { accessTokenCustomerCreate } from "$lib/shopify";
import { fail, redirect } from "@sveltejs/kit";
import z from "zod";

export const loginUser = form(
  z.object({
    email: z.email(),
    password: z.string().min(6, "Minimo 6 caracteres"),
  }),
  async ({ email, password }) => {
    const token = await accessTokenCustomerCreate({
      email,
      password,
    });

    if (token.customerUserErrors.length) {
      return fail(400, { status: 400, message: token.customerUserErrors.map((err) => err.message), notUserExist: true });
    }
    const { cookies } = getRequestEvent();
    cookies.set('sessionid', token.customerAccessToken.accessToken, {
      path: '/',
      expires: new Date(token.customerAccessToken.expiresAt),
      priority: 'high',
      httpOnly: true,
    });

    throw redirect(303, '/conta');
  }
);