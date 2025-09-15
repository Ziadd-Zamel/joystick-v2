import { Suspense } from "react";
import CartPage from "./_components/cart-page";
import CartPageSkeleton from "./_components/cart-page-skeleton";

export default async function Page() {
  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage />
    </Suspense>
  );
}
