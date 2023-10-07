interface IImageCardProduct {
  transformedSrc
  width
  height
}

interface IPoduct {
  handle: string;
  title: string
  image: IImageCardProduct;
  price: number;
}
