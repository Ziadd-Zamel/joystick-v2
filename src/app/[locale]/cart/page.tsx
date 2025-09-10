import { getAllCart } from "@/lib/api/cart";
import CartEmptyState from "./_components/cart-empty-state";

export default async function Page() {
  const cartItems = await getAllCart();
  const items = 0;
  console.log(cartItems.data.data.length);
  // Check if cart is empty
  if (!items) {
    return <CartEmptyState />;
  }

  return <div></div>;
}
