// See https://kit.svelte.dev/docs/types#app

import type { Collection, Customer } from "./@types/storefront.types";

// WebMCP - atributos para formulários e links acessíveis a agentes de IA
// @see https://webmachinelearning.github.io/webmcp
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

// WebMCP - API navigator.modelContext (Model Context Protocol no browser)
// @see https://webmachinelearning.github.io/webmcp
interface ModelContextTool {
  name: string;
  description: string;
  inputSchema?: object;
  execute: (input: object, client: ModelContextClient) => Promise<unknown>;
  annotations?: { readOnlyHint?: boolean };
}

interface ModelContextClient {
  requestUserInteraction(callback: () => Promise<unknown>): Promise<unknown>;
}

interface ModelContext {
  provideContext?(options?: { tools?: ModelContextTool[] }): void;
  clearContext?(): void;
  registerTool(tool: ModelContextTool): void;
  unregisterTool(name: string): void;
}

interface Navigator {
  modelContext?: ModelContext;
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

export {};
