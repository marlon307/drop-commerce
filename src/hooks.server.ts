import { MCP_MANIFEST } from "#lib/mcp/manifest.js";
import { clientShopify } from "#lib/shopify/index.js";
import { queryCustomer } from "#lib/shopify/query/customer.js";
import type { Handle } from "@sveltejs/kit/hooks";
import type { Collection, Customer } from "./@types/storefront.types";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === "/.well-known/mcp.json") {
    return Response.json(MCP_MANIFEST, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const dataCustomer = await clientShopify.request(queryCustomer, {
      variables: {
        token: event.cookies.get("sessionid") || "",
      },
    });

    event.locals.customer = (dataCustomer?.data?.customer as Customer) ?? null;
    event.locals.collections =
      (dataCustomer?.data?.collections?.edges
        ?.filter(
          (collection) =>
            !collection.node.title.startsWith("hidden") &&
            !collection.node.handle.startsWith("hidden"),
        )
        .map((collection) => ({
          title: collection.node.title,
          handle: collection.node.handle,
        })) as Collection[]) || [];
  } catch {
    event.locals.customer = null;
    event.locals.collections = [];
  }

  return await resolve(event);
};
