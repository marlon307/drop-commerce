import { customerFragment } from "../fragment/customer";

export const createCustomer = `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      ...customer
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
${customerFragment}`;

export const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
    }
    customerUserErrors {
      message
    }
  }
}
`;
