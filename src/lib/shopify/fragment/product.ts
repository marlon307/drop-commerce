export const fragmentProductCard = `
  fragment product on Product {
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
`;
