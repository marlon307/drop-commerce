/** @type {import('./$types').Actions} */

import { updateCustomer } from "$lib/shopify";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  acceptsMarketing: z.boolean()
});

export const actions = {
  user: async ({ request, cookies }) => {
    const formData = await request.formData();
    const data = schema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      tel: formData.get('tel'),
      acceptsMarketing: !!formData.get('prom_accept')
    });

    const nameUser = data.name.split(' ');
    const customerUpdate = await updateCustomer(cookies.get('sessionid')!, {
      firstName: nameUser.shift(),
      lastName: nameUser.join(' '),
      email: data.email,
      phone: data.tel,
      acceptsMarketing: data.acceptsMarketing
    })

    if (customerUpdate.customerAccessToken) {
      cookies.set('sessionid', customerUpdate.customerAccessToken.accessToken, { path: '/' });
      throw redirect(303, '/conta');
    }

    return { success: true };
  }
};
