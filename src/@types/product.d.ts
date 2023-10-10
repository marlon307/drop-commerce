interface IImageCardProduct {
  transformedSrc
  width
  height
}

interface IPriceProduct {
  amount: string;
}

interface IPoductCard {
  handle: string;
  title: string
  image: IImageCardProduct;
  price: number;
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
  price: IPriceProduct;
  title: string;
  sku: string;
  availableForSale: boolean;
  images: IImageProduct[];
  barcode: string;
  selectedOptions: ISelectedOptions[];
}

interface IPorduct {
  title: string;
  descriptionHtml: string;
  variants: IVariantsProduct[];
  images: IImageProduct[];
}
