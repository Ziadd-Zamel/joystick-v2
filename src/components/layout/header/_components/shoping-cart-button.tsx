import { Button } from "@/components/ui/button";
import { getAllCart } from "@/lib/api/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default async function ShoppingCartButton() {
  // Fetch cart data from API
  const cart = await getAllCart();

  // Extract the number of items in cart from the nested data structure
  const cartLength = cart.data.data.length;

  return (
    <div className="relative">
      <Link href="/cart">
        <Button className="size-10" variant={"ghost"}>
          <ShoppingCart className="size-7" strokeWidth={1.3} />
        </Button>
      </Link>

      {/* Badge that only shows when cart has items */}
      {cartLength > 0 && (
        <span className="absolute top-0 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#02A09B] px-1 text-xs font-semibold text-white">
          {cartLength > 99 ? "99+" : cartLength}
        </span>
      )}
    </div>
  );
}
