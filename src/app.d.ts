// See https://kit.svelte.dev/docs/types#app

import type { Collection, Customer } from "./@types/storefront.types";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: Customer | null;
      collections: Collection[];
    }
    interface PageData {
      customer: Customer | null;
      collections: Collection[];
    }
    // interface Platform {}
  }
}

export {};
