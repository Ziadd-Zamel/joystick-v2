import { Suspense } from "react";
import CheckoutPage from "./_components/checkout-page";
import { fetchUserAddresses } from "@/lib/actions/profile.actions";
import CheckoutPageSkeleton from "./_components/checkout-page-skeleton";

export default async function Page() {
  // Fetch cart items
  const userAddresses = await fetchUserAddresses();

  return (
    <Suspense fallback={<CheckoutPageSkeleton />}>
      <CheckoutPage userAddresses={userAddresses} />;
    </Suspense>
  );
}
