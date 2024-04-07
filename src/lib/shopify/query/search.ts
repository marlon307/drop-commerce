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
        url: url(transform: { maxHeight: 78, maxWidth: 78, crop: CENTER, preferredContentType: WEBP })
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
