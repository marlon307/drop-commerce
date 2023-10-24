interface IImageCardProduct {
  transformedSrc
  width
  height
}

interface IPoductCard {
  handle: string;
  title: string
  featuredImage: IImageCardProduct;
  priceRange: IPriceProduct;
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

interface IPriceProduct {
  maxVariantPrice: {
    amount: string;
    currencyCode: string;
  };
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

interface IVariantsProduct {
  id: string;
  priceRange: IPriceProduct;
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
