import { customerFragment } from "../fragment/customer";

export const queryCustomer = `
query getCusttokerAccessToken($token: String!){
  customer(customerAccessToken: $token) {
    ...customer
  }
}
${customerFragment}`;
