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
  shippingAddress: IAddress;
  lineItems: LineItem[];
}
