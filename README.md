# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## WebMCP (Web Model Context Protocol)

O projeto segue o padrão [WebMCP](https://webmachinelearning.github.io/webmcp), permitindo que agentes de IA e tecnologias assistivas interajam com a loja de forma estruturada.

### Ferramentas expostas (API imperativa)

Quando o ambiente oferece `navigator.modelContext` (ex.: polyfill [MCP-B](https://docs.mcp-b.ai/)), as seguintes ferramentas são registradas:

| Ferramenta       | Descrição                          | Parâmetros                               |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| `searchProducts` | Busca produtos por palavra-chave   | `query: string`                          |
| `getProduct`     | Detalhes de um produto pelo handle | `handle: string`                         |
| `addToCart`      | Adiciona item ao carrinho          | `variantId: string`, `quantity?: number` |
| `getCart`        | Retorna o carrinho atual           | —                                        |

### Atributos declarativos

Formulários e links principais usam atributos para descrição semântica para agentes:

- **Formulários:** `toolname`, `tooldescription` (ex.: login, register, searchProducts, updateProfile).
- **Inputs:** `toolparamdescription` para cada campo.
- **Links:** `toolname`, `tooldescription` em navegação (ex.: goToLogin, goToRegister).
