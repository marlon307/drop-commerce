// See https://kit.svelte.dev/docs/types#app

import type { Customer } from "./@types/storefront.types";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: Customer | null;
      collections: ICategorie[];
    }
    interface PageData {
      customer: Customer | null;
      collections: ICategorie[];
    }
    // interface Platform {}
  }
}

export {};
