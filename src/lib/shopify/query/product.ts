import { fragmentProductCard } from "../fragment/product";

export const getProductsCollectionQuery = `
query getCollectionProducts($collection: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
  collectionByHandle(handle: $collection) {
    description
    image {
      transformedSrc (maxWidth: 200, maxHeight: 150)
    }
    products(sortKey: $sortKey, reverse: $reverse, first: 100) {
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
  products(first: 50, query: $query, sortKey: $sort, reverse: $reverse) {
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
    seo {
      title
      description
    }
    options {
      id
      name
      values
    }
    variants(first: 20) {
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
    images(first: 10) {
      edges {
        node {
          src
          width
          height
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
