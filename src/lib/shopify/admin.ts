import { env } from "$env/dynamic/private";

type GraphQLError = { message?: string };

type AdminResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};

function buildAdminEndpoint() {
  const domain = env.SHOPIFY_STORE_DOMAIN;
  const version = env.SHOPIFY_ADMIN_API_VERSION || "2026-01";

  if (!domain) {
    throw new Error("SHOPIFY_STORE_DOMAIN não configurado.");
  }

  const normalizedDomain = domain.startsWith("http") ? domain : `https://${domain}`;
  return `${normalizedDomain.replace(/\/$/, "")}/admin/api/${version}/graphql.json`;
}

export async function requestShopifyAdmin<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const adminToken = env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!adminToken) {
    throw new Error(
      "SHOPIFY_ADMIN_ACCESS_TOKEN não configurado para usar Shopify Admin API.",
    );
  }

  const response = await fetch(buildAdminEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Admin API respondeu com status ${response.status}.`);
  }

  const payload = (await response.json()) as AdminResponse<TData>;
  if (payload.errors?.length) {
    throw new Error(
      payload.errors.map((error) => error.message).filter(Boolean).join(" | "),
    );
  }

  if (!payload.data) {
    throw new Error("Admin API não retornou dados.");
  }

  return payload.data;
}

