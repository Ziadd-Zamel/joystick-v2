import CartItemCard from "./cart-item-card";
import DiscountSection from "./discount-section";

export default function CartPage({ CartItems }: { CartItems: Cart[] }) {
  return (
    <div className="box-container flex flex-col items-start justify-between gap-5 py-20 lg:flex-row">
      <div className="w-full space-y-4 lg:w-[60%]">
        {CartItems.map((item) => {
          return <CartItemCard key={item.id} item={item} />;
        })}
      </div>
      <div className="h-full w-full lg:w-[35%]">
        <DiscountSection shipping={20} cartItems={CartItems} />
      </div>
    </div>
  );
}
