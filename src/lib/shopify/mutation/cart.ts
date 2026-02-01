import { cartLineFragment } from "../fragment/cart";

export const createCartShopify = `
#graphql
mutation createCart($linesItems: [CartLineInput!]){
  cartCreate(input: { lines: $linesItems }) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const updateCartShopify = `
#graphql
mutation editCartItems($cartId: ID!, $linesItems: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const removeCartShopify = `
#graphql
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const addCartShopify = `
#graphql
mutation addCartItem($cartId: ID!, $linesItems: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;
