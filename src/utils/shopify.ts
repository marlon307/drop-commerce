import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY, SHOPIFY_API_END_POINT } from '$env/static/private';


const shopify = shopifyApi({
  apiKey: SHOPIFY_API_KEY,
  apiSecretKey: SHOPIFY_API_SECRET_KEY,
  scopes: ['read_products'],
  hostName: SHOPIFY_API_END_POINT,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false
});

const session = shopify.auth.callback({
  rawRequest: req,
  rawResponse: res,
});

const clientShopify = new shopify.clients.Rest({ session });
const response = client.get({ path: 'shop' });

export default shopify;

