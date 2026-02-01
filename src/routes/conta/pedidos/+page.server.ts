import { clientShopify } from "$lib/shopify";
import { queryCustomerOrders } from "$lib/shopify/query/customer";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const orders = await clientShopify.request(queryCustomerOrders, {
    variables: { token: cookies.get("sessionid")! },
  });
  return {
    orders: orders.data?.customer?.orders.edges,
  };
};
