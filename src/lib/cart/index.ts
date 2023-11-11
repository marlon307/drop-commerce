
import { writable } from 'svelte/store'

const cartData = () => {
  const { set, subscribe } = writable<ICart>();

  async function getDataCart() {
    const data = await fetch("/api/cart");
    set(await data.json());
  }

  return {
    getDataCart,
    set,
    subscribe,
  }
}

export const cartStoreData = cartData();
