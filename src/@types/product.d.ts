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
  compareAtPriceRange: {
    maxVariantPrice: IPrice;
    minVariantPrice: IPrice;
  }
}

interface IImageProduct {
  src?: string;
  url: string;
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
  compareAtPrice: IPrice | null;
}

interface ICombination {
  id: string;
  availableForSale: boolean;
  [key: string]: any;
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

interface IImageMedia {
  heigth: number;
  width: number;
  src: string;
}

interface ISources {
  url: string;
  mimeType: string;
}

interface IMedia {
  id: string;
  mediaContentType: 'EXTERNAL_VIDEO' | 'IMAGE' | 'MODEL_3D' | 'VIDEO';
  previewImage: IImageProduct;
  originUrl?: string;
  sources: ISources[]
}

interface IPorduct {
  id: string;
  title: string;
  descriptionHtml: string;
  description: string;
  variants: IVariantsProduct[];
  media: IMedia[];
  options: IOption[];
  seo: ISeo;
}
