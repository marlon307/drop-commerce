export const getCollectionsQuery = `
{
  collections(first: 100) {
    edges {
      node {
        handle
        title
      }
    }
  }
}
`;
