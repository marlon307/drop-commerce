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
      /**
       * Nome do campo alinhado com o formulário de busca (`name="search"`).
       * Isso garante que ferramentas como o Inspector usem o mesmo nome
       * de parâmetro ao chamar a ferramenta WebMCP.
       */
      search: {
        type: "string",
        description: "Palavra-chave para buscar produtos na loja",
      },
    },
    required: ["search"],
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

function getModelContext():
  | (ModelContext & {
      registerTool: (tool: ModelContextTool) => void;
      provideContext?: (options?: { tools?: ModelContextTool[] }) => void;
      clearContext?: () => void;
      unregisterTool?: (name: string) => void;
    })
  | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { modelContext?: ModelContext };
  return nav.modelContext ?? null;
}

/**
 * Registra as ferramentas WebMCP no contexto do navegador.
 * Só tem efeito em ambientes que implementam a API (ex.: polyfill MCP-B, futuros browsers).
 */
export function registerWebMCPTools(): void {
  const modelContext = getModelContext();
  if (!modelContext?.registerTool) return;

  const tools: ModelContextTool[] = [
    {
      name: "searchProducts",
      description:
        "Busca produtos na loja por palavra-chave. Retorna lista de produtos com título, preço e handle para ver detalhes.",
      inputSchema: INPUT_SCHEMA.searchProducts,
      execute: async (input: { search?: string }) => {
        // O Inspector/extension envia `{ \"search\": \"...\" }`
        const query = typeof input?.search === "string" ? input.search : "";
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Falha ao buscar produtos");
        const data = await res.json();
        return { products: data, query };
      },
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  // Se o polyfill suportar provideContext, usamos ele para tornar
  // o registro idempotente (chamadas repetidas apenas sobrescrevem).
  if (typeof modelContext.provideContext === "function") {
    try {
      modelContext.provideContext({ tools });
      return;
    } catch (err) {
      console.warn("[WebMCP] Falha ao fornecer contexto, tentando registerTool:", err);
    }
  }

  // Fallback: registrar um a um, ignorando erro de nome duplicado
  for (const tool of tools) {
    try {
      modelContext.registerTool(tool);
    } catch (err: unknown) {
      if (
        err instanceof DOMException &&
        err.name === "InvalidStateError"
      ) {
        // Tool já registrada – seguro ignorar em ambientes com HMR/navegações.
        continue;
      }
      console.warn("[WebMCP] Falha ao registrar ferramenta:", tool.name, err);
    }
  }
}
