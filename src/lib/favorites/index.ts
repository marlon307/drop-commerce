const PRODUCT_ID_PREFIX = "gid://shopify/Product/";

function isProductGid(value: string): boolean {
  return value.startsWith(PRODUCT_ID_PREFIX);
}

export function sanitizeFavoriteProductIds(values: unknown): string[] {
  if (!Array.isArray(values)) return [];

  return Array.from(
    new Set(
      values
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter((value) => value.length > 0 && isProductGid(value)),
    ),
  );
}

export function parseFavoritesMetafield(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];

  try {
    return sanitizeFavoriteProductIds(JSON.parse(value));
  } catch {
    return [];
  }
}

