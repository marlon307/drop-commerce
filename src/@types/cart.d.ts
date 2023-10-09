interface ILineProductCart {
  id: string;
  quantity: number;
  merchandise: Merchandise
  attributes: any[];
}

interface IProductCart {
  title: string;
  handle: string;
}

interface Merchandise {
  id: string;
  selectedOptions: ISelectedOption[]
  image: IImageProductCart;
  price: IPriceProductCart;
  product: IProductCart;
}

interface ISelectedOption {
  name: string;
  value: string;
}

interface IImageProductCart {
  transformedSrc: string;
}

interface IPriceProductCart {
  amount: string;
}

interface IAttribute {
  key: string;
  value: string;
}

interface ICost {
  totalAmount: ITotalAmount;
  subtotalAmount: ISubtotalAmount;
  totalTaxAmount: ITotalTaxAmount;
  totalDutyAmount: any;
}

interface ITotalAmount {
  amount: string;
  currencyCode: string;
}

interface ISubtotalAmount {
  amount: string;
  currencyCode: string;
}

interface ITotalTaxAmount {
  amount: string;
  currencyCode: string;
}

interface IBuyerIdentity {
  email: any;
  phone: any;
  customer: any;
  countryCode: any;
  deliveryAddressPreferences: any[];
}

interface ICart {
  id: string;
  checkoutUrl: string;
  lines: ILineProductCart[];
  attributes: IAttribute[];
  cost: ICost;
  buyerIdentity: IBuyerIdentity;
  totalQuantity: number;
}
