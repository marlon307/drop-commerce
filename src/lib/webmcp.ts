/**
 * WebMCP - Web Model Context Protocol
 * Expõe ferramentas do e-commerce para agentes de IA via navigator.modelContext.
 * @see https://webmachinelearning.github.io/webmcp
 * @see https://docs.mcp-b.ai/
 */

const INPUT_SCHEMA = {
  searchProducts: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Palavra-chave para buscar produtos na loja",
      },
    },
    required: ["query"],
  },
  getProduct: {
    type: "object",
    properties: {
      handle: {
        type: "string",
        description: "Identificador único do produto (slug/handle)",
      },
    },
    required: ["handle"],
  },
  addToCart: {
    type: "object",
    properties: {
      variantId: {
        type: "string",
        description: "ID da variante do produto (ex: gid://shopify/ProductVariant/...)",
      },
      quantity: {
        type: "integer",
        description: "Quantidade a adicionar (padrão: 1)",
        default: 1,
      },
    },
    required: ["variantId"],
  },
} as const;

function getModelContext(): { registerTool: (tool: unknown) => void } | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { modelContext?: { registerTool: (t: unknown) => void } };
  return nav.modelContext ?? null;
}

/**
 * Registra as ferramentas WebMCP no contexto do navegador.
 * Só tem efeito em ambientes que implementam a API (ex.: polyfill MCP-B, futuros browsers).
 */
export function registerWebMCPTools(): void {
  const modelContext = getModelContext();
  if (!modelContext?.registerTool) return;

  try {
    // Buscar produtos por palavra-chave
    modelContext.registerTool({
      name: "searchProducts",
      description:
        "Busca produtos na loja por palavra-chave. Retorna lista de produtos com título, preço e handle para ver detalhes.",
      inputSchema: INPUT_SCHEMA.searchProducts,
      execute: async (input: { query?: string }) => {
        const query = typeof input?.query === "string" ? input.query : "";
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Falha ao buscar produtos");
        const data = await res.json();
        return { products: data, query };
      },
    });

    // Obter detalhes de um produto pelo handle
    modelContext.registerTool({
      name: "getProduct",
      description:
        "Retorna detalhes de um produto pelo handle (slug): título, descrição, variantes, preços e URL.",
      inputSchema: INPUT_SCHEMA.getProduct,
      execute: async (input: { handle?: string }) => {
        const handle = typeof input?.handle === "string" ? input.handle : "";
        if (!handle) throw new Error("handle é obrigatório");
        const res = await fetch(`/api/product/${encodeURIComponent(handle)}`);
        if (!res.ok) {
          if (res.status === 404) return { error: "Produto não encontrado" };
          throw new Error("Falha ao buscar produto");
        }
        return await res.json();
      },
    });

    // Adicionar item ao carrinho
    modelContext.registerTool({
      name: "addToCart",
      description:
        "Adiciona um item ao carrinho. Requer o ID da variante do produto (variantId). Quantidade opcional (padrão 1).",
      inputSchema: INPUT_SCHEMA.addToCart,
      execute: async (input: { variantId?: string; quantity?: number }) => {
        const variantId = typeof input?.variantId === "string" ? input.variantId : "";
        if (!variantId) throw new Error("variantId é obrigatório");
        const quantity = typeof input?.quantity === "number" && input.quantity > 0 ? input.quantity : 1;
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: variantId, quantity }),
        });
        if (!res.ok) throw new Error("Falha ao adicionar ao carrinho");
        const data = await res.json();
        return { success: true, cart: data };
      },
    });

    // Obter carrinho atual (somente leitura)
    modelContext.registerTool({
      name: "getCart",
      description:
        "Retorna o carrinho atual do usuário: itens, quantidades, preços e totais.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Falha ao obter carrinho");
        return await res.json();
      },
      annotations: { readOnlyHint: true },
    });
  } catch (err) {
    console.warn("[WebMCP] Falha ao registrar ferramentas:", err);
  }
}
