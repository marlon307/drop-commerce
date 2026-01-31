import {
  addCartItem,
  createCart,
  getCartId,
  removeCartItem,
  updateCartItem,
} from "$lib/shopify";
import { json } from "@sveltejs/kit";

export async function GET({ cookies }) {
  const cart = await getCartId(cookies.get("cart")!);
  return json({ ...cart }, { status: 200 });
}

export async function POST({ cookies, request }) {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();
  const cartDataInfo = await getCartId(cartId);
  let cartResp;

  if (cartDataInfo?.id && cartId) {
    const lineId = cartDataInfo.lines.find(
      (line: ILineProductCart) => line.merchandise.id === varaintInfo.id,
    );
    if (lineId) {
      cartResp = await updateCartItem(cartId, {
        id: lineId.id,
        merchandiseId: varaintInfo.id,
        quantity: lineId.quantity + 1,
      });
    } else {
      cartResp = await addCartItem(cartId, [
        {
          merchandiseId: varaintInfo.id,
          quantity: 1,
        },
      ]);
    }
    return json(cartResp, { status: 200 });
  }

  cartResp = await createCart([
    {
      quantity: 1,
      merchandiseId: varaintInfo.id,
    },
  ]);

  cookies.set("cart", cartResp.id, { path: "/", httpOnly: true });
  return json({ ...cartResp, ...cookies }, { status: 201 });
}

export async function PUT({ request, cookies }) {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();

  let cart;
  if (varaintInfo.quantity <= 0) {
    cart = await removeCartItem(cartId, [varaintInfo.lineId]);
    return json({ ...cart }, { status: 200 });
  }
  cart = await updateCartItem(cartId, {
    id: varaintInfo.lineId,
    merchandiseId: varaintInfo.id,
    quantity: varaintInfo.quantity,
  });
  return json({ ...cart }, { status: 200 });
}

export async function DELETE({ request, cookies }) {
  const cartId = cookies.get("cart")!;
  const varaintInfo = await request.json();
  const cart = await removeCartItem(cartId, [varaintInfo.lineId]);
  return json({ ...cart }, { status: 200 });
}
