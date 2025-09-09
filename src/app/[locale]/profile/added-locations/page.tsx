import { Suspense } from "react";
import AddNewAddressDialog from "./_components/add-new-address-dialog";
import AddedAddressesList from "./_components/added-address-list";
import AddressCardSkeleton from "./_components/address-card-skeleton";

export default async function Page() {
  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <header className="flex items-center justify-between border-b border-zinc-200 p-4">
        <h2 className="text-lg font-medium">Favorite address</h2>
        {/* Add new address dialog */}
        <AddNewAddressDialog />
      </header>

      {/* Profile form */}

      <Suspense fallback={<AddressCardSkeleton />}>
        <AddedAddressesList />
      </Suspense>
    </div>
  );
}
