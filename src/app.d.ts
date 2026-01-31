// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      customer: ICustomer;
      collections: ICategorie[];
    }
    interface PageData {
      customer: ICustomer;
      collections: ICategorie[];
    }
    // interface Platform {}
  }
}

export {};
