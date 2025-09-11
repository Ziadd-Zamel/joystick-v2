import { useTranslations } from "next-intl";
import RepairRequestForm from "../_components/repair-request-form";

export default function Page() {
  const t = useTranslations("profile-route");
  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("repair-request")}</h2>

      <div className="p-5">
        <RepairRequestForm />
      </div>
    </div>
  );
}
