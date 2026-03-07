import {
  sanitizeFavoriteProductIds,
  parseFavoritesMetafield,
} from "$lib/favorites";
import { requestShopifyAdmin } from "$lib/shopify/admin";
import { json } from "@sveltejs/kit";
import { z } from "zod";

const MAX_FAVORITES = 200;

const inputSchema = z.object({
  productId: z.string().startsWith("gid://shopify/Product/"),
});

const setCustomerFavoritesMutation = `
#graphql
mutation setCustomerFavorites($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      key
      namespace
      value
    }
    userErrors {
      field
      message
    }
  }
}
`;

type MetafieldsSetResponse = {
  metafieldsSet?: {
    metafields?: { value?: string | null }[];
    userErrors?: {
      field?: string[] | null;
      message?: string | null;
    }[];
  };
};

function unauthorizedResponse() {
  return json(
    { message: "Faça login para gerenciar seus favoritos." },
    { status: 401 },
  );
}

async function persistFavorites(customerId: string, favorites: string[]) {
  const data = await requestShopifyAdmin<MetafieldsSetResponse>(
    setCustomerFavoritesMutation,
    {
      metafields: [
        {
          ownerId: customerId,
          namespace: "custom",
          key: "favorites",
          type: "json",
          value: JSON.stringify(favorites),
        },
      ],
    },
  );

  const userErrors = data.metafieldsSet?.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(
      userErrors.map((error) => error.message).filter(Boolean).join(" | "),
    );
  }

  const metafieldValue = data.metafieldsSet?.metafields?.[0]?.value;
  return parseFavoritesMetafield(metafieldValue);
}

export async function GET({ locals }) {
  if (!locals.customer?.id) return unauthorizedResponse();
  return json({ favorites: locals.favorites ?? [] }, { status: 200 });
}

export async function POST({ locals, request }) {
  if (!locals.customer?.id) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  const parsed = inputSchema.safeParse(body);

  if (!parsed.success) {
    return json({ message: "Informe um productId válido." }, { status: 400 });
  }

  const currentFavorites = sanitizeFavoriteProductIds(locals.favorites);
  const currentSet = new Set(currentFavorites);

  if (currentSet.has(parsed.data.productId)) {
    currentSet.delete(parsed.data.productId);
  } else {
    currentSet.add(parsed.data.productId);
  }

  const nextFavorites = Array.from(currentSet);
  if (nextFavorites.length > MAX_FAVORITES) {
    return json(
      {
        message: `Limite de ${MAX_FAVORITES} favoritos atingido.`,
      },
      { status: 400 },
    );
  }

  try {
    const persistedFavorites = await persistFavorites(
      locals.customer.id,
      nextFavorites,
    );

    return json(
      {
        favorites: persistedFavorites,
        isFavorite: persistedFavorites.includes(parsed.data.productId),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return json(
      {
        message:
          "Não foi possível atualizar seus favoritos agora. Tente novamente.",
      },
      { status: 500 },
    );
  }
}

