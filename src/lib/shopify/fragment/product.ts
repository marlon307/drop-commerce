export const fragmentProductCard = `
  #graphql
  fragment product on Product {
    handle
    title
    description
    featuredImage {
      url
      xl: url(transform: { maxHeight: 955, maxWidth: 955, crop: CENTER, preferredContentType: WEBP })
      lg: url(transform: { maxHeight: 318, maxWidth: 318, crop: CENTER, preferredContentType: WEBP })
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
