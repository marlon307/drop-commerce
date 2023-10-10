import { json } from '@sveltejs/kit';
import { addCartItem, createCart, getCartId, updateCartItem } from '$lib/shopify';

export async function GET({ cookies }) {
  const cart = await getCartId(cookies.get('cart')!);
  return json({ ...cart }, { status: 200 });
}

export async function POST({ cookies, request }) {
  const cartId = cookies.get('cart');
  const varaintInfo = await request.json()

  if (cartId) {
    const cartDataInfo = await getCartId(cartId);
    const lineId = cartDataInfo.lines.find((line: ILineProductCart) => line.merchandise.id === varaintInfo.id)
    let cartResp;
    if (lineId) {
      cartResp = await updateCartItem(cartId, {
        id: lineId.id,
        merchandiseId: varaintInfo.id,
        quantity: lineId.quantity + 1,
      });
    } else {
      cartResp = await addCartItem(cartId, [{
        merchandiseId: varaintInfo.id,
        quantity: 1,
      }]);
    }
    return json(cartResp, { status: 201 })
  }

  const cartResp = await createCart([{
    quantity: 1,
    merchandiseId: varaintInfo.id,
  }]);

  cookies.set('cart', cartResp.id, { path: '/' });
  return json({ id: 12, ...cookies }, { status: 201 });
}
