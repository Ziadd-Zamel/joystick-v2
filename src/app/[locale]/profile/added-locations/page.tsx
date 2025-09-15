import { Suspense } from "react";
import AddNewAddressDialog from "./_components/add-new-address-dialog";
import AddedAddressesList from "./_components/added-address-list";
import AddressCardSkeleton from "./_components/address-card-skeleton";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("profile-route");

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <header className="flex items-center justify-between border-b border-zinc-200 p-4">
        <h2 className="text-lg font-medium">{t("added-locations")}</h2>
        {/* Add new address dialog */}
        <AddNewAddressDialog>
          <Image alt="add Icon" width={25} height={25} src={"/assets/icons/add-address.svg"} />
        </AddNewAddressDialog>
      </header>

      {/* Profile form */}

      <Suspense fallback={<AddressCardSkeleton />}>
        <AddedAddressesList />
      </Suspense>
    </div>
  );
}
