interface ILinesCart {
  id?: string;
  merchandiseId: string;
  quantity: number;
}

interface ILineProductCart {
  id: string;
  quantity: number;
  merchandise: IMerchandise;
  attributes: any[];
}

interface IProductCart {
  title: string;
  handle: string;
}

interface IMerchandise {
  id: string;
  title: string;
  image: IImageProductCart;
  price: IPriceProductCart;
  product: IProductCart;
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
  cartOpen: boolean;
}
