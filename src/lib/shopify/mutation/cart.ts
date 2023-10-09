export const createCartShopify = `mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "gid://shopify/ProductVariant/41947260715191"
        }
      ],
    }
  ) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 100) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
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
