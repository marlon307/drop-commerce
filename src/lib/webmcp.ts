/**
 * WebMCP - Torna o site acessível a agentes de IA
 * Expõe ferramentas estruturadas que agentes podem descobrir e chamar diretamente.
 * @see https://docs.mcp-b.ai/
 */

const STORE_NAME = "BIG UTI";
const STORE_URL = "https://biguti.com";
const STORE_EMAIL = "contato@biguti.com";

interface ModelContext {
  provideContext?: (opts: { tools: ToolDefinition[] }) => void;
}

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  };
  execute: (args: Record<string, unknown>) => Promise<{
    content: Array<{ type: string; text: string }>;
  }>;
}

export async function initWebMCP() {
  // Import dinâmico mantém @mcp-b/global fora do bundle do servidor.
  // Esta função só é chamada de onMount (apenas no browser).
  await import("@mcp-b/global");

  const mc = (navigator as Navigator & { modelContext?: ModelContext })
    .modelContext;

  if (!mc?.provideContext) return;

  mc.provideContext({
    tools: [
      {
        name: "searchProducts",
        description: `Pesquisa produtos na loja ${STORE_NAME}. Retorna até 10 produtos com handle, título, preço e URL. Use para encontrar produtos por palavra-chave.`,
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Palavra-chave ou termo de busca",
            },
          },
          required: ["query"],
        },
        async execute({ query }) {
          const q = typeof query === "string" ? query : "";
          const resp = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          const products = await resp.json();
          const results = (Array.isArray(products) ? products : []).slice(0, 10).map(
            (p: { handle?: string; title?: string; priceRange?: { minVariantPrice?: { amount?: string; currencyCode?: string }; maxVariantPrice?: { amount?: string; currencyCode?: string } }; featuredImage?: { url?: string } }) => ({
              handle: p.handle,
              title: p.title,
              price: p.priceRange?.minVariantPrice?.amount,
              currencyCode: p.priceRange?.minVariantPrice?.currencyCode,
              url: `${typeof window !== "undefined" ? window.location.origin : STORE_URL}/produto/${p.handle}`,
            }),
          );
          return {
            content: [{ type: "text", text: JSON.stringify(results) }],
          };
        },
      },
      {
        name: "getProductDetails",
        description: `Obtém detalhes de um produto da ${STORE_NAME} pelo handle (slug). Retorna variantes com IDs para adicionar ao carrinho.`,
        inputSchema: {
          type: "object",
          properties: {
            handle: {
              type: "string",
              description: "Handle/slug do produto (ex: nome-do-produto)",
            },
          },
          required: ["handle"],
        },
        async execute({ handle }) {
          const h = typeof handle === "string" ? handle : "";
          const resp = await fetch(`/api/product/${encodeURIComponent(h)}`);
          if (!resp.ok) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({ error: "Produto não encontrado" }),
                },
              ],
            };
          }
          const product = await resp.json();
          return {
            content: [{ type: "text", text: JSON.stringify(product) }],
          };
        },
      },
      {
        name: "addToCart",
        description: `Adiciona um produto ao carrinho na ${STORE_NAME}. Requer o ID da variante (obtido via getProductDetails).`,
        inputSchema: {
          type: "object",
          properties: {
            variantId: {
              type: "string",
              description:
                "ID da variante do produto (ex: gid://shopify/ProductVariant/123)",
            },
          },
          required: ["variantId"],
        },
        async execute({ variantId }) {
          const id = typeof variantId === "string" ? variantId : "";
          const resp = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, quantity: 1 }),
          });
          const data = await resp.json();
          if (!resp.ok) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({
                    success: false,
                    error: data?.message || "Erro ao adicionar ao carrinho",
                  }),
                },
              ],
            };
          }
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: true,
                  message: "Produto adicionado ao carrinho",
                  checkoutUrl: data?.checkoutUrl,
                }),
              },
            ],
          };
        },
      },
      {
        name: "getCart",
        description: `Retorna o conteúdo atual do carrinho na ${STORE_NAME}. Inclui itens, totais e URL de checkout.`,
        inputSchema: {
          type: "object",
          properties: {},
        },
        async execute() {
          const resp = await fetch("/api/cart");
          const cart = await resp.json();
          const lines = cart?.lines?.edges?.map(
            (e: {
              node: {
                id: string;
                quantity: number;
                merchandise: {
                  product: { title: string; handle: string };
                  title: string;
                  price: { amount: string; currencyCode: string };
                };
              };
            }) => ({
              id: e.node.id,
              quantity: e.node.quantity,
              title: e.node.merchandise?.product?.title,
              variant: e.node.merchandise?.title,
              price: e.node.merchandise?.price?.amount,
              currencyCode: e.node.merchandise?.price?.currencyCode,
              productUrl: `/produto/${e.node.merchandise?.product?.handle}`,
            }),
          ) || [];
          const result = {
            items: lines,
            totalAmount: cart?.cost?.totalAmount?.amount,
            currencyCode: cart?.cost?.totalAmount?.currencyCode,
            checkoutUrl: cart?.checkoutUrl,
            isEmpty: !lines?.length,
          };
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        },
      },
      {
        name: "getStoreContext",
        description: `Retorna informações estruturadas sobre a loja ${STORE_NAME} - nome, contato, categorias e contexto do site.`,
        inputSchema: {
          type: "object",
          properties: {},
        },
        async execute() {
          const result = {
            name: STORE_NAME,
            url: typeof window !== "undefined" ? window.location.origin : STORE_URL,
            contact: STORE_EMAIL,
            description: "Loja de utilidades e produtos diversos",
            pages: {
              home: "/",
              products: "/produtos",
              about: "/sobre",
              faq: "/faq",
              terms: "/termos-e-condicoes",
              privacy: "/politica-de-privacidade",
              shipping: "/politica-de-envio-e-devolucao",
              cookies: "/politica-de-cookies",
            },
          };
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
          };
        },
      },
    ],
  });
}
