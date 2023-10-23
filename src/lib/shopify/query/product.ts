import { fragmentProductCard } from "../fragment/product";

export const getProductsCollectionQuery = `
query getCollectionProducts($collection: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
  collectionByHandle(handle: $collection) {
    products(sortKey: $sortKey, reverse: $reverse, first: 100) {
      edges {
        node {
          handle
          title
          images(first: 1) {
            edges {
              node {
                transformedSrc
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
}`;

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

export const getProductsSrotQueyQuery = `{
  products(first: 20, sortKey: TITLE) {
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
