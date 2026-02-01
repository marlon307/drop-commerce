import { cartLineFragment } from "../fragment/cart";

export const getCartIdMutation = `
#graphql
query getCart($idCart: ID!) {
  cart(id: $idCart) {
    ...cart
  }
}
${cartLineFragment}`;
