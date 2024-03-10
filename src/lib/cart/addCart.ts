import { cartStoreData } from "$lib/cart";

export async function addToCart(vriantId: string) {
  if (vriantId) {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: vriantId,
        quantity: 1,
      }),
    });
    cartStoreData.set({
      cartOpen: true,
      ...(await res.json()),
    });
  }
}
