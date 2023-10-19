interface LineItem {
  quantity: number;
  variant: Variant;
}

interface Variant {
  title: string;
  product: Product;
  price: TotalTax;
  image: Image;
}

interface Image {
  transformedSrc: string;
}

interface Product {
  handle: string;
  title: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  city: string;
  company: string;
  country: string;
  zip: string;
  provinceCode: string;
  address1: string;
  address2: string;
}

interface TotalTax {
  amount: string;
  currencyCode: string;
}

interface IOrder {
  name: string;
  orderNumber: number;
  financialStatus: string;
  totalTax: TotalTax;
  totalPrice: TotalTax;
  totalShippingPrice: TotalTax;
  shippingAddress: ShippingAddress;
  lineItems: LineItem[];
}
