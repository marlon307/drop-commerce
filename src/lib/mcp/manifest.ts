export const MCP_MANIFEST = {
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
    },
    {
      name: "login",
      description:
        "Autentica o usuário com e-mail e senha.",
      inputSchema: {
        type: "object",
        properties: {
          email: { type: "string", description: "E-mail da conta do usuário" },
          password: { type: "string", description: "Senha da conta" },
        },
        required: ["email", "password"],
      },
    },
    {
      name: "recoverPassword",
      description:
        "Solicita envio de e-mail para redefinição de senha.",
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
    },
    {
      name: "saveAddress",
      description: "Salva ou edita um endereço de entrega do usuário autenticado.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID do endereço a editar (omitir para criar novo)" },
          name: { type: "string", description: "Nome completo do destinatário" },
          zip: { type: "string", description: "CEP (apenas números)" },
          address1: { type: "string", description: "Rua e número principal" },
          address2: { type: "string", description: "Complemento (apto, bloco, etc.)" },
          city: { type: "string", description: "Cidade" },
          province: { type: "string", description: "Estado (UF)" },
          country: { type: "string", description: "País (ex: Brazil)" },
        },
        required: ["name", "zip", "address1", "city", "province", "country"],
      },
    },
  ],
};
