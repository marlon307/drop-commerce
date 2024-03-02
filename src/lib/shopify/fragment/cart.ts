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
              title
              image {
                transformedSrc: url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })
                # transformedSrc (maxWidth: 78, maxHeight: 78)
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
