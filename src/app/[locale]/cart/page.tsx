import { getAllCart } from "@/lib/api/cart";
import CartEmptyState from "./_components/cart-empty-state";
import CartPage from "./_components/cart-page";

export default async function Page() {
  // Fetch cart items
  const cartItems = await getAllCart();

  // Check if cart is empty
  if (!cartItems.data.data.length) {
    return <CartEmptyState />;
  }
  console.log(cartItems);
  // Render cart page with items
  return <CartPage CartItems={cartItems.data.data} />;
}
