import { clientShopify } from "$lib/shopify";
import { queryCustomer } from "$lib/shopify/query/customer";
import { json, type Handle } from "@sveltejs/kit";
import type { Collection, Customer } from "./@types/storefront.types";

const MCP_MANIFEST = {
  name: "BIG UTI",
  description:
    "Loja online BIG UTI – busque produtos, veja detalhes e adicione ao carrinho.",
  tools: [
    {
      name: "searchProducts",
      description:
        "Busca produtos na loja por palavra-chave. Retorna lista com título, preço e handle.",
      inputSchema: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Palavra-chave para buscar produtos na loja",
          },
        },
        required: ["search"],
      },
    },
    {
      name: "getProduct",
      description:
        "Retorna detalhes de um produto pelo handle: título, descrição, variantes, preços e URL.",
      inputSchema: {
        type: "object",
        properties: {
          handle: {
            type: "string",
            description: "Identificador único do produto (slug/handle)",
          },
        },
        required: ["handle"],
      },
    },
    {
      name: "addToCart",
      description:
        "Adiciona um item ao carrinho. Requer o ID da variante do produto (variantId).",
      inputSchema: {
        type: "object",
        properties: {
          variantId: {
            type: "string",
            description:
              "ID da variante do produto (ex: gid://shopify/ProductVariant/...)",
          },
          quantity: {
            type: "integer",
            description: "Quantidade a adicionar (padrão: 1)",
            default: 1,
          },
        },
        required: ["variantId"],
      },
    },
    {
      name: "getCart",
      description:
        "Retorna o carrinho atual do usuário: itens, quantidades, preços e totais.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
  ],
};

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === "/.well-known/mcp.json") {
    return json(MCP_MANIFEST, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  const dataCustomer = await clientShopify.request(queryCustomer, {
    variables: {
      token: event.cookies.get("sessionid") || "",
    },
  });

  // If your query does not return all Customer fields, use a compatible type
  event.locals.customer = (dataCustomer?.data?.customer as Customer) ?? null;
  event.locals.collections =
    (dataCustomer?.data?.collections?.edges
      ?.filter(
        (collection) =>
          !collection.node.title.startsWith("hidden") ||
          !collection.node.handle.startsWith("hidden"),
      )
      .map((collection) => ({
        title: collection.node.title,
        handle: collection.node.handle,
      })) as Collection[]) || [];
  return await resolve(event);
};
