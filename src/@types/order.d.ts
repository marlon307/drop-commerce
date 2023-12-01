interface Variant {
  id: string;
  title: string;
  product: Product;
  price: TotalTax;
  image: Image;
}

interface LineItem {
  quantity: number;
  variant: Variant;
}

interface Image {
  transformedSrc: string;
}

interface Product {
  handle: string;
  title: string;
}

interface TotalTax {
  amount: string;
  currencyCode: string;
}

interface ITrackingInfo {
  number: string;
  url: string;
}

interface ITraking {
  trackingCompany: string;
  trackingInfo: ITrackingInfo[];
}

interface IOrder {
  name: string;
  orderNumber: number;
  financialStatus: string;
  totalTax: TotalTax;
  totalPrice: TotalTax;
  totalShippingPrice: TotalTax;
  shippingAddress: IAddress;
  lineItems: LineItem[];
  successfulFulfillments: ITraking[];
}
