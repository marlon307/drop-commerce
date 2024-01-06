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
  query getProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
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
      values
    }
    media(first: 50) {
      edges {
        node {
          id
          previewImage {
            url
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
            previewImage {
              src
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
            src
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
    featuredImage {
      height
      src
      width
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
