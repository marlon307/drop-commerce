import { clientShopify } from "$lib/shopify";
import { queryCustomer } from "$lib/shopify/query/customer";
import type { Handle } from "@sveltejs/kit";
import type { Customer } from "./@types/storefront.types";

export const handle: Handle = async ({ event, resolve }) => {
  const dataCustomer = await clientShopify.request(queryCustomer, {
    variables: {
      token: event.cookies.get("sessionid") || "",
    },
  });

  // If your query does not return all Customer fields, use a compatible type
  event.locals.customer = (dataCustomer?.data?.customer as Customer) ?? null;
  event.locals.collections =
    dataCustomer?.data?.collections?.edges
      ?.filter(
        (collection) =>
          !collection.node.title.startsWith("hidden") ||
          !collection.node.handle.startsWith("hidden"),
      )
      .map((collection) => ({
        title: collection.node.title,
        handle: collection.node.handle,
      })) || [];
  return await resolve(event);
};
