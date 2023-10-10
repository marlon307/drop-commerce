import { cartLineFragment } from "../fragment/cart";

export const createCartShopify = `mutation createCart($linesItems: [CartLineInput!]){
  cartCreate(input: { lines: $linesItems }) {
    cart {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                selectedOptions {
                  name
                  value
                }
                image {
                  transformedSrc (maxWidth: 80, maxHeight: 80)
                }
                price {
                  amount
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}`

export const updateCartShopify = `mutation editCartItems($cartId: ID!, $linesItems: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
} ${cartLineFragment}`;

export const addCartShopify = `mutation addCartItem($cartId: ID!, $linesItems: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $linesItems) {
    cart {
      ...cart
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
} ${cartLineFragment}`;

