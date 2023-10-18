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
          id
          name
          orderNumber
          financialStatus
        }
      }
    }
  }
}
`;
