interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}

interface ICustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

interface ICustomerUserErrors {
  [k: string]: any;
}
