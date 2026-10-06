import { clientShopify } from "#lib/shopify/index.js";
import {
  addCartShopify,
  createCartShopify,
  removeCartShopify,
  updateCartShopify,
} from "#lib/shopify/mutation/cart.js";
import { getCartIdMutation } from "#lib/shopify/query/cart.js";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies }) => {
  const cartId = cookies.get("cart");
  if (!cartId) return Response.json({}, { status: 200 });
  const { data } = await clientShopify.request(getCartIdMutation, {
    variables: { idCart: cartId },
  });
  return Response.json({ ...data?.cart }, { status: 200 });
};

export const POST: RequestHandler = async ({ cookies, request }) => {
  const cartId = cookies.get("cart")!;

  const varaintInfo = await request.json();
  const { data: cartDataInfo } = await clientShopify.request(
    getCartIdMutation,
    {
      variables: {
        idCart: cookies.get("cart")!,
      },
    },
  );
  let cartResp;

  if (cartDataInfo?.cart?.id && cartId) {
    const lineId = cartDataInfo.cart.lines.edges.find(
      (line) => line.node.merchandise.id === varaintInfo.id,
    );
    if (lineId) {
      const addQty = Math.max(1, Number(varaintInfo.quantity) || 1);
      const { data } = await clientShopify.request(updateCartShopify, {
        variables: {
          cartId: cartId,
          linesItems: [
            {
              id: lineId.node.id,
              merchandiseId: varaintInfo.id,
              quantity: lineId.node.quantity + addQty,
            },
          ],
        },
      });
      cartResp = data?.cartLinesUpdate?.cart;
    } else {
      const qty = Math.max(1, Number(varaintInfo.quantity) || 1);
      const { data } = await clientShopify.request(addCartShopify, {
        variables: {
          cartId: cartId,
          linesItems: [
            {
              quantity: qty,
              merchandiseId: varaintInfo.id,
            },
          ],
        },
      });
      cartResp = data?.cartLinesAdd?.cart;
    }
    return Response.json(cartResp, { status: 200 });
  }
  const qty = Math.max(1, Number(varaintInfo.quantity) || 1);
  const { data } = await clientShopify.request(createCartShopify, {
    variables: {
      linesItems: [
        {
          quantity: qty,
          merchandiseId: varaintInfo.id,
        },
      ],
    },
  });
  cartResp = data?.cartCreate?.cart;

  if (!cartResp?.id) {
    return Response.json({ error: "Falha ao criar carrinho" }, { status: 500 });
  }
  cookies.set("cart", cartResp.id, {
    path: "/",
    httpOnly: true,
  });
  return Response.json(cartResp, { status: 201 });
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();

  if (varaintInfo.quantity <= 0) {
    const { data } = await clientShopify.request(removeCartShopify, {
      variables: {
        cartId: cartId,
        lineIds: [varaintInfo.lineId],
      },
    });
    return Response.json({ ...data?.cartLinesRemove?.cart }, { status: 200 });
  }

  const merchandiseId = varaintInfo.variantId ?? varaintInfo.id;
  const { data } = await clientShopify.request(updateCartShopify, {
    variables: {
      cartId: cartId,
      linesItems: [
        {
          id: varaintInfo.lineId,
          merchandiseId,
          quantity: varaintInfo.quantity,
        },
      ],
    },
  });
  return Response.json({ ...data?.cartLinesUpdate?.cart }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();
  const { data } = await clientShopify.request(removeCartShopify, {
    variables: {
      cartId: cartId,
      lineIds: [varaintInfo.lineId],
    },
  });
  return Response.json({ ...data?.cartLinesRemove?.cart }, { status: 200 });
};
