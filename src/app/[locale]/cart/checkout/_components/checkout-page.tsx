import CheckoutContent from "./checkout-content";
import CartEmptyState from "../../_components/cart-empty-state";
import { getAllCart } from "@/lib/actions/cart.actions";

export default async function CheckoutPage({ userAddresses }: { userAddresses: Address[] }) {
  const cartItems = await getAllCart();
  if (!cartItems.data.data.length) {
    return <CartEmptyState />;
  }
  return <CheckoutContent userAddresses={userAddresses} CartItems={cartItems.data.data} />;
}
