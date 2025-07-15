import { fragmentProductCard } from "../fragment/product";

export const getProductsCollectionQuery = `
query getCollectionProducts($collection: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
  collectionByHandle(handle: $collection) {
    description
    image {
      transformedSrc (maxWidth: 200, maxHeight: 150)
    }
    products(first: 100, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...product
        }
      }
    }
  }
}
${fragmentProductCard}`;

export const getProductsQuery = `
query getProducts($query: String, $sort: ProductSortKeys, $reverse: Boolean) {
  products(first: 100, query: $query, sortKey: $sort, reverse: $reverse) {
    edges {
      node {
        ...product
      }
    }
  }
}
${fragmentProductCard}`;

export const getProductByHandler = `
#graphql
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    id
    title
    descriptionHtml
    description
    seo {
      title
      description
    }
    options {
      id
      name
      optionValues {
        name
        swatch {
          color
        }
      }
    }
    media(first: 50) {
      edges {
        node {
          id
          previewImage {
            url
            transformedSrc: url(transform: { maxHeight: 72, maxWidth: 72, crop: CENTER, preferredContentType: WEBP })
            xl: url(transform: { maxHeight: 930, maxWidth: 930, crop: CENTER, preferredContentType: WEBP })
            lg: url(transform: { maxHeight: 681, maxWidth: 681, crop: CENTER, preferredContentType: WEBP })
            sm: url(transform: { maxHeight: 450, maxWidth: 450, crop: CENTER, preferredContentType: WEBP })
            xs: url(transform: { maxHeight: 341, maxWidth: 341, crop: CENTER, preferredContentType: WEBP })
            width
            height
          }
          mediaContentType
          ... on Video {
            id
            sources {
              url
              format
              mimeType
            }
          }
          ... on ExternalVideo {
            originUrl
            embedUrl
            previewImage {
              url
              width
              height
            }
          }
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          barcode
          price {
            amount
            currencyCode
          }
          image {
            url
            width
            height
          }
          selectedOptions {
            name
            value
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`;

export const productRecommendations = `
query productRecommendations($productId: ID!) {
  productRecommendations(productId: $productId) {
    ...product
  }
}
${fragmentProductCard}`;
