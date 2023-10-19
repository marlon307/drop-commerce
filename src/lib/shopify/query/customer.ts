import { customerFragment } from "../fragment/customer";

export const queryCustomer = `
query getCustomerAccessToken($token: String!) {
  customer(customerAccessToken: $token) {
    ...customer
  }
}
${customerFragment}`;


export const queryCustomerOrders = `
query getCustomerAccessToken($token: String!) {
  customer(customerAccessToken: $token) {
    orders(first: 10) {
      edges {
        node {
          name
          orderNumber
          financialStatus
          totalTax {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          totalShippingPrice {
            amount
            currencyCode
          }
          shippingAddress {
            firstName
            lastName
            city
            company
            country
            zip
            provinceCode
            address1
            address2
          }
          lineItems(first: 250) {
            edges {
              node {
                quantity
                variant {
                  title
                  product {
                    handle
                    title
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    transformedSrc (maxWidth: 80, maxHeight: 80)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
