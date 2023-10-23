export const predictiveSearchQuery = `
  query suggestions($query: String!) {
    predictiveSearch(query: $query) {
      queries {
        text
      }
      products {
        handle
        title
        featuredImage {
          transformedSrc (maxWidth: 80, maxHeight: 80)
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
    }
  }
`;
