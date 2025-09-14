import { useTranslations } from "next-intl";
import AddDeviceDialog from "./_components/add-device-dialog";
import AddedDevicesList from "./_components/added-devices-list";

export default function Page() {
  const t = useTranslations("profile-route");

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <header className="flex items-center gap-4 border-b border-zinc-200 p-4">
        <h2 className="flex-1 text-lg font-medium">{t("added-devices")}</h2>
        {/* Add new device dialog */}

        {/* <Link href="#">
          <History className="text-main size-7" />
        </Link> */}

        <AddDeviceDialog />
      </header>

      <div className="p-5">
        <AddedDevicesList />
      </div>
    </div>
  );
}
