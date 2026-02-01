import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (locals.customer?.email) return { customer: locals.customer };
  throw redirect(303, "/auth/login");
};
