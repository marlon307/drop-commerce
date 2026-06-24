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
  ],
};
