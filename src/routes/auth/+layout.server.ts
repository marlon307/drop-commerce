import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  if (
    locals.customer?.email &&
    !["/auth/recover", "/auth/reset"].includes(url.pathname)
  )
    throw redirect(303, "/");
};
