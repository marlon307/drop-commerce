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
