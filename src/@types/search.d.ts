interface FeaturedImage {
  url: string;
}

interface ISearchProducts {
  handle: string;
  title: string;
  featuredImage: FeaturedImage;
  priceRange: PriceRange;
}

interface PriceRange {
  maxVariantPrice: MaxVariantPrice;
  minVariantPrice: MaxVariantPrice;
}

interface MaxVariantPrice {
  amount: string;
  currencyCode: string;
}
