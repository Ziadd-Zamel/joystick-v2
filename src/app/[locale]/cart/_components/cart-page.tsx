import { getAllCart } from "@/lib/api/cart";
import CartEmptyState from "./cart-empty-state";
import CartItemCard from "./cart-item-card";
import DiscountSection from "./discount-section";

export default async function CartPage() {
  // Fetch cart
  const cart = await getAllCart();

  // Cart Items
  const cartItems = cart.data.data as Cart[];

  // Check if cart is empty
  if (!cartItems || cartItems.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="box-container flex flex-col items-start justify-between gap-5 py-20 lg:flex-row">
      {/** Cart Items */}
      <div className="w-full space-y-4 lg:w-[60%]">
        {cartItems.map((item) => {
          return <CartItemCard key={item.id} item={item} />;
        })}
      </div>

      {/** Discount Section */}
      <div className="h-full w-full lg:w-[35%]">
        <DiscountSection shipping={20} cartItems={cartItems} />
      </div>
    </div>
  );
}
