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

const tools: ModelContextTool[] = [
  {
    name: "searchProducts",
    description:
      "Busca produtos na loja por palavra-chave. Retorna lista de produtos com título, preço e handle para ver detalhes.",
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
    execute: async (input: { search?: string }) => {
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
    execute: async (input: { variantId?: string; quantity?: number }) => {
      const variantId =
        typeof input?.variantId === "string" ? input.variantId : "";
      if (!variantId) throw new Error("variantId é obrigatório");
      const quantity =
        typeof input?.quantity === "number" && input.quantity > 0
          ? input.quantity
          : 1;
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
  {
    name: "updateCartQuantity",
    description:
      "Atualiza a quantidade de um item no carrinho. Use quantity <= 0 para remover o item.",
    inputSchema: {
      type: "object",
      properties: {
        lineId: {
          type: "string",
          description:
            "ID da linha do carrinho (ex: gid://shopify/CartLine/...)",
        },
        variantId: {
          type: "string",
          description: "ID da variante do produto",
        },
        quantity: {
          type: "integer",
          description:
            "Nova quantidade (use 0 ou negativo para remover o item)",
        },
      },
      required: ["lineId", "variantId", "quantity"],
    },
    execute: async (input: {
      lineId?: string;
      variantId?: string;
      quantity?: number;
    }) => {
      const lineId = typeof input?.lineId === "string" ? input.lineId : "";
      const variantId =
        typeof input?.variantId === "string" ? input.variantId : "";
      if (!lineId || !variantId)
        throw new Error("lineId e variantId são obrigatórios");
      const quantity = typeof input?.quantity === "number" ? input.quantity : 1;
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId, variantId, quantity }),
      });
      if (!res.ok) throw new Error("Falha ao atualizar carrinho");
      return await res.json();
    },
  },
  {
    name: "removeFromCart",
    description: "Remove um item do carrinho pelo ID da linha.",
    inputSchema: {
      type: "object",
      properties: {
        lineId: {
          type: "string",
          description:
            "ID da linha do carrinho (ex: gid://shopify/CartLine/...)",
        },
      },
      required: ["lineId"],
    },
    execute: async (input: { lineId?: string }) => {
      const lineId = typeof input?.lineId === "string" ? input.lineId : "";
      if (!lineId) throw new Error("lineId é obrigatório");
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineId }),
      });
      if (!res.ok) throw new Error("Falha ao remover item do carrinho");
      return await res.json();
    },
  },
];

export function registerWebMCPTools(): void {
  const modelContext = getModelContext();
  if (!modelContext?.registerTool) return;

  if (typeof modelContext.provideContext === "function") {
    try {
      modelContext.provideContext({ tools });
      return;
    } catch (err) {
      console.warn(
        "[WebMCP] Falha ao fornecer contexto, tentando registerTool:",
        err,
      );
    }
  }

  for (const tool of tools) {
    try {
      modelContext.registerTool(tool);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "InvalidStateError") {
        continue;
      }
      console.warn("[WebMCP] Falha ao registrar ferramenta:", tool.name, err);
    }
  }
}
