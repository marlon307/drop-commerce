interface IImageCardProduct {
  transformedSrc
  width
  height
}

interface IPrice {
  amount: string;
  currencyCode: string;
}

interface IPriceRange {
  maxVariantPrice: IPrice;
  minVariantPrice: IPrice;
}

interface IPoductCard {
  handle: string;
  title: string
  featuredImage: IImageCardProduct;
  priceRange: IPriceRange;
}

interface IImageProduct {
  src: string;
  width: number;
  height: number;
}

interface ISelectedOptions {
  name: string;
  value: string;
}

interface IVariantsProduct {
  id: string;
  price: IPrice;
  title: string;
  sku: string;
  availableForSale: boolean;
  images: IImageProduct[];
  barcode: string;
  selectedOptions: ISelectedOptions[];
}

interface IOption {
  id: string;
  name: string;
  values: string;
}

interface ISeo {
  title: string;
  description: string;
}

interface IPorduct {
  title: string;
  descriptionHtml: string;
  variants: IVariantsProduct[];
  images: IImageProduct[];
  options: IOption[];
  seo: ISeo;
}
