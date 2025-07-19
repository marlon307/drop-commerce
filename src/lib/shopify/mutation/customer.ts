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
      expiresAt
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`;

export const customerUpdate = `
#graphql
mutation customerUpdate($customer: CustomerUpdateInput!, $token: String!) {
  customerUpdate(customer: $customer, customerAccessToken: $token) {
    customer {
      ...customer
    }
    customerAccessToken {
      accessToken
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
${customerFragment}`;


export const customerRecover = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      field
      message
      code
    }
  }
}
`;

export const customerReset = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
  customerReset(id: $id, input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    
  }
}
`;

export const customerActive = `mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
  customerActivate(id: $id, input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`;
