import { cartLineFragment } from "../fragment/cart";

export const createCartShopify = `mutation createCart($linesItems: [CartLineInput!]){
  cartCreate(input: { lines: $linesItems }) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const updateCartShopify = `mutation editCartItems($cartId: ID!, $linesItems: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const removeCartShopify = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;

export const addCartShopify = `mutation addCartItem($cartId: ID!, $linesItems: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
    }
  }
}
${cartLineFragment}`;
