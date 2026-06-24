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
  {
    name: "login",
    description:
      "Autentica o usuário com e-mail e senha. Retorna sucesso ou erros de validação.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "E-mail da conta do usuário",
        },
        password: {
          type: "string",
          description: "Senha da conta",
        },
      },
      required: ["email", "password"],
    },
    execute: async (input: { email?: string; password?: string }) => {
      const email = typeof input?.email === "string" ? input.email : "";
      const password =
        typeof input?.password === "string" ? input.password : "";
      if (!email || !password)
        throw new Error("email e password são obrigatórios");
      const body = new URLSearchParams({ email, password });
      const res = await fetch("/auth/login?/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        redirect: "manual",
      });
      if (res.status === 303 || res.ok) return { success: true };
      return { success: false, error: "Credenciais inválidas" };
    },
  },
  {
    name: "recoverPassword",
    description:
      "Solicita o envio de e-mail para redefinição de senha. Requer o e-mail da conta.",
    inputSchema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "E-mail da conta para enviar o link de redefinição",
        },
      },
      required: ["email"],
    },
    execute: async (input: { email?: string }) => {
      const email = typeof input?.email === "string" ? input.email : "";
      if (!email) throw new Error("email é obrigatório");
      const body = new URLSearchParams({ email });
      const res = await fetch("/auth/recover?/recover", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        redirect: "manual",
      });
      if (res.status === 303 || res.ok) return { success: true };
      return { success: false, error: "Falha ao solicitar recuperação de senha" };
    },
  },
  {
    name: "saveAddress",
    description:
      "Salva ou edita um endereço de entrega do usuário autenticado.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "ID do endereço a editar (omitir para criar novo)",
        },
        name: {
          type: "string",
          description: "Nome completo do destinatário",
        },
        zip: {
          type: "string",
          description: "CEP (apenas números)",
        },
        address1: {
          type: "string",
          description: "Rua e número principal",
        },
        address2: {
          type: "string",
          description: "Complemento (apto, bloco, etc.)",
        },
        city: {
          type: "string",
          description: "Cidade",
        },
        province: {
          type: "string",
          description: "Estado (UF)",
        },
        country: {
          type: "string",
          description: "País (ex: Brazil)",
        },
      },
      required: ["name", "zip", "address1", "city", "province", "country"],
    },
    execute: async (input: object) => {
      const data = input as Record<string, string>;
      const fields = [
        "id",
        "name",
        "zip",
        "address1",
        "address2",
        "city",
        "province",
        "country",
      ];
      const body = new URLSearchParams();
      for (const field of fields) {
        if (typeof data[field] === "string") body.set(field, data[field]);
      }
      const res = await fetch("/conta/endereco?/saveAddress", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        redirect: "manual",
      });
      if (res.status === 303 || res.ok) return { success: true };
      return { success: false, error: "Falha ao salvar endereço" };
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
