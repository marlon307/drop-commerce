export const cartLineFragment = `
#graphql
fragment cart on Cart {
  id
  checkoutUrl
  totalQuantity
  lines(first: 200) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })
              width
              height
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
        attributes {
          key
          value
        }
      }
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
    totalAmount {
      amount
      currencyCode
    }
  }
  buyerIdentity {
    email
    phone
    customer {
      id
    }
    countryCode
  }
  delivery {
    addresses {
      ... on CartSelectableAddress {
        id
        oneTimeUse
      }
    }
  }
}
`;
