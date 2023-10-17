import { cartLineFragment } from "../fragment/cart";

export const getCartIdMutation = `
  query getCart($idCart: ID!) {
    cart(id: $idCart) {
      ...cart
    }
  }
${cartLineFragment}`;
