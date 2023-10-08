export const getProductsCollectionQuery = `
query getCollectionProducts($collection: String!) {
  collectionByHandle(handle: $collection) {
    products(first: 50) {
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
                price
              }
            }
          }
        }
      }
    }
  }
}`;

export const getProductsQuery = `{
  products(first: 50) {
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
              price
            }
          }
        }
      }
    }
  }
}`

export const getProductsSrotQueyQuery = `{
  products(first: 20, sortKey: TITLE) {
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
              price
            }
          }
        }
      }
    }
  }
}`

export const getProductByHandler = `
  query getProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    title
    descriptionHtml
    variants(first: 20) {
      edges {
        node {
          price
          title
          sku
          availableForSale
          barcode
          compareAtPrice
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
}`
