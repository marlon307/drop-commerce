export const fragmentProductCard = `
  fragment product on Product {
    handle
    title
    featuredImage {
      transformedSrc
      width
      height
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;
