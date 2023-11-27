import { customerFragment } from "../fragment/customer";

export const queryCustomer = `
query getCustomerAccessToken($token: String!) {
  customer(customerAccessToken: $token) {
    ...customer
  }
  collections(first: 100, sortKey: RELEVANCE) {
    edges {
      node {
        handle
        title
      }
    }
  }
}
${customerFragment}`;

export const queryCustomerAddress = `
query getCustomerAccessToken($token: String!) {
  customer(customerAccessToken: $token) {
    addresses(first: 10) {
      edges {
        node {
          id
          firstName
          lastName
          city
          company
          country
          zip
          province
          address1
          address2
        }
      }
    }
  }
}
`;

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
            province
            address1
            address2
          }
          lineItems(first: 250) {
            edges {
              node {
                quantity
                variant {
                  id
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
