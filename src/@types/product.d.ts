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
