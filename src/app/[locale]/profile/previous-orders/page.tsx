import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import PrevOrdersTable from "./_components/prev-orders-store-table";
import PrevOrdersMaintenanceTable from "./_components/prev-orders-maintenance-table";

export default function Page() {
  const t = useTranslations("profile-route");

  return (
    <div className="h-full rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("previous-orders")}</h2>

      <div className="p-5">
        {/* Tabs instead of query params */}
        <Tabs defaultValue="store" className="w-full">
          <TabsList className="flex w-full gap-5 rounded-none border-b bg-transparent text-base font-medium text-zinc-900 !shadow-none">
            <TabsTrigger
              value="store"
              className={cn(
                "cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent !p-4 text-base !shadow-none transition-all duration-300",
                "data-[state=active]:border-main",
              )}
            >
              {t("store")}
            </TabsTrigger>
            <TabsTrigger
              value="repair"
              className={cn(
                "s cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent !p-4 text-base !shadow-none transition-all duration-300",
                "data-[state=active]:border-main",
              )}
            >
              {t("maintenance")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="store" className="pt-6">
            <PrevOrdersTable />
          </TabsContent>

          <TabsContent value="repair" className="pt-6">
            <PrevOrdersMaintenanceTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
