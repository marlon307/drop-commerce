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
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}`;

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
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}`;

export const getProductByHandler = `
  query getProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    title
    descriptionHtml
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
