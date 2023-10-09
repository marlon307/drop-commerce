import { json } from '@sveltejs/kit';
import { createCart } from '$lib/shopify';

export async function POST({ cookies, request }) {
  const cartId = cookies.get('cart');
  const varaintInfo = await request.json()

  if (cartId) {
    return json({ id: 12, cookies }, { status: 201 })
  }

  const cartResp = await createCart([{
    quantity: 1,
    merchandiseId: varaintInfo.id,
  }]);

  cookies.set('cart', cartResp.id, { path: '/' });
  return json({ id: 12, ...cookies }, { status: 201 })
}
