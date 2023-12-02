interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptsMarketing: boolean;
}

interface ICustomerUserErrors {
  [k: string]: any;
}
