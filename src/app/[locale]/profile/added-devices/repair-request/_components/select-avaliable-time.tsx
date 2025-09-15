import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { getAvaliableTime } from "@/lib/actions/profile.actions";
import { useTranslations } from "next-intl";
import { RepairRequeseFormValues } from "@/lib/schemas/profile.schema";

export type AvailableTime = {
  id: number;
  day_id: number;
  time: string;
  status: "available" | "unavailable";
  created_at: string;
  updated_at: string;
};

export default function SelectAvaliableTime({
  form,
}: {
  form: UseFormReturn<RepairRequeseFormValues>;
}) {
  const t = useTranslations("profile-route");
  const watchedDayId = form.watch("availableDayId");

  const {
    data: avaliableTimeData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["avaliable-times", watchedDayId],
    queryFn: () => getAvaliableTime(watchedDayId),
    enabled: !!watchedDayId,
  });

  const avaliableTime: AvailableTime[] = avaliableTimeData?.data;

  return (
    <FormField
      control={form.control}
      name="availableTimeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="m-0">{t("available-time")}</FormLabel>
          <Select
            disabled={isLoading || isFetching || !avaliableTime?.length}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="!h-12 w-full rounded-sm border-[#F0EEF0]">
                <SelectValue placeholder={t("available-time")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {avaliableTime?.map((time) => (
                <SelectItem key={time.id} value={time.id + ""}>
                  {time.time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
