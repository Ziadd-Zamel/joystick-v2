import { getAllCart } from "@/lib/api/cart";
import CartEmptyState from "../_components/cart-empty-state";
import CheckoutPage from "./_components/checkout-page";

export default async function Page() {
  // Fetch cart items
  const cartItems = await getAllCart();

  // Check if cart is empty
  if (!cartItems.data.data.length) {
    return <CartEmptyState />;
  }

  return <CheckoutPage CartItems={cartItems.data.data} />;
}
