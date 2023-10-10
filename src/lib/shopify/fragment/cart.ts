export const cartLineFragment = `
  fragment cart on Cart {
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
`;
