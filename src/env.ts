import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SHOPIFY_ACCESS_TOKEN: { static: true },
	SHOPIFY_STORE_DOMAIN: { static: true }
});
