export const customerFragment = `
#graphql
fragment customer on Customer {
  id
  firstName
  lastName
  email
  phone
  acceptsMarketing
}
`;
