interface IImageCardProduct {
  transformedSrc
  width
  height
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

interface IVariantsProduct {
  price: string;
  title: strring;
  sku: string;
  availableForSale: boolean;
  images: IImageProduct[];
  barcode: string;
  selectedOptions: {
    name: string;
    valies: string;
  }
}

interface IPorduct {
  title: string;
  descriptionHtml: string;
  variants: IVariantsProduct[];
  images: IImageProduct[];
}
