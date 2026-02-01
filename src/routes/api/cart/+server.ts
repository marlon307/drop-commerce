import { clientShopify } from "$lib/shopify";
import {
  addCartShopify,
  createCartShopify,
  removeCartShopify,
  updateCartShopify,
} from "$lib/shopify/mutation/cart";
import { getCartIdMutation } from "$lib/shopify/query/cart";
import { json } from "@sveltejs/kit";

export async function GET({ cookies }) {
  const { data } = await clientShopify.request(getCartIdMutation, {
    variables: {
      idCart: cookies.get("cart")!,
    },
  });
  return json({ ...data?.cart }, { status: 200 });
}

export async function POST({ cookies, request }) {
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
      const { data } = await clientShopify.request(updateCartShopify, {
        variables: {
          cartId: cartId,
          linesItems: {
            id: lineId.node.id,
            merchandiseId: varaintInfo.id,
            quantity: lineId.node.quantity + 1,
          },
        },
      });
      cartResp = data?.cartLinesUpdate?.cart;
    } else {
      const { data } = await clientShopify.request(addCartShopify, {
        variables: {
          cartId: cartId,
          linesItems: [
            {
              quantity: 1,
              merchandiseId: varaintInfo.id,
            },
          ],
        },
      });
      cartResp = data?.cartLinesAdd?.cart;
    }
    return json(cartResp, { status: 200 });
  }
  const { data } = await clientShopify.request(createCartShopify, {
    variables: {
      linesItems: [
        {
          quantity: 1,
          merchandiseId: varaintInfo.id,
        },
      ],
    },
  });
  cartResp = data?.cartCreate?.cart;

  cookies.set("cart", data?.cartCreate?.cart?.id || "", {
    path: "/",
    httpOnly: true,
  });
  return json({ ...cartResp, ...cookies }, { status: 201 });
}

export async function PUT({ request, cookies }) {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();

  if (varaintInfo.quantity <= 0) {
    const { data } = await clientShopify.request(removeCartShopify, {
      variables: {
        cartId: cartId,
        lineIds: [varaintInfo.lineId],
      },
    });
    return json({ ...data?.cartLinesRemove?.cart }, { status: 200 });
  }

  const { data } = await clientShopify.request(updateCartShopify, {
    variables: {
      cartId: cartId,
      linesItems: {
        id: varaintInfo.lineId,
        merchandiseId: varaintInfo.id,
        quantity: varaintInfo.quantity,
      },
    },
  });
  return json({ ...data?.cartLinesUpdate?.cart }, { status: 200 });
}

export async function DELETE({ request, cookies }) {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();
  const { data } = await clientShopify.request(removeCartShopify, {
    variables: {
      cartId: cartId,
      lineIds: [varaintInfo.lineId],
    },
  });
  return json({ ...data?.cartLinesRemove?.cart }, { status: 200 });
}
