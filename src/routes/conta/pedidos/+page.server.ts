import { clientShopify } from "#lib/shopify/index.js";
import { queryCustomerOrders } from "#lib/shopify/query/customer.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const orders = await clientShopify.request(queryCustomerOrders, {
    variables: { token: cookies.get("sessionid")! },
  });
  return {
    orders: orders.data?.customer?.orders.edges,
  };
};
