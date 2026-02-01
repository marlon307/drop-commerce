import { customerFragment } from "../fragment/customer";

export const queryCustomer = `
#graphql
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
#graphql
query queryCustomerAddress($token: String!) {
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
#graphql
query getCustomerOrders($token: String!) {
  customer(customerAccessToken: $token) {
    orders(first: 10, reverse: true) {
      edges {
        node {
          id
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
          successfulFulfillments {
            trackingCompany
            trackingInfo {
              number
              url
            }
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
                    url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })
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
