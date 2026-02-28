// See https://kit.svelte.dev/docs/types#app

import type { Collection, Customer } from "./@types/storefront.types";

// WebMCP - atributos para formulários acessíveis a agentes de IA
// @see https://docs.mcp-b.ai/
declare module "svelte/elements" {
  interface HTMLFormAttributes {
    toolname?: string;
    tooldescription?: string;
  }
  interface HTMLInputAttributes {
    toolparamdescription?: string;
  }
  interface HTMLButtonAttributes {
    toolname?: string;
    tooldescription?: string;
  }
  interface HTMLAnchorAttributes {
    toolname?: string;
    tooldescription?: string;
  }
}

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

export { };
