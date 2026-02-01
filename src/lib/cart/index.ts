import { writable } from "svelte/store";
import type { Cart } from "../../@types/storefront.types";

const cartData = () => {
  const { set, subscribe } = writable<{ cartOpen: boolean } & Cart>();

  async function getDataCart() {
    const data = await fetch("/api/cart");
    set({
      ...(await data.json()),
      cartOpen: false,
    });
  }

  return {
    getDataCart,
    set,
    subscribe,
  };
};

export const cartStoreData = cartData();
