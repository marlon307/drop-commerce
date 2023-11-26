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
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
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
