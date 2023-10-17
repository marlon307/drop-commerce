export const cartLineFragment = `
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
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
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
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
    }
  }
`;
