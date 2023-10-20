export const customerAddressUpdate = `
mutation customerAddressUpdate($dataAddress: MailingAddressInput!, $token: String!, $idAddress: ID!) {
  customerAddressUpdate(address: $dataAddress, customerAccessToken: $token, id: $idAddress) {
    customerAddress {
      firstName
      lastName
      address1
      address2
      city
      country
      zip
      province
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`;

export const customerAddressDelete = `
mutation customerAddressDelete($token: String!, $idAddress: ID!) {
  customerAddressDelete(customerAccessToken: $token, id: $idAddress) {
    customerUserErrors {
      field
      message
      code
    }
    deletedCustomerAddressId
  }
}
`;
