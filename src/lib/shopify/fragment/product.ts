export const fragmentProductCard = `
  fragment product on Product {
    handle
    title
    featuredImage {
      transformedSrc
      # transformedSrc (maxWidth: 80, maxHeight: 80)
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
