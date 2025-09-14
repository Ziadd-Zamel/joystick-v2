import { UseFormReturn } from "react-hook-form";
import { RepairRequeseFormValues } from "./repair-request-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllAvaliableDays } from "@/lib/actions/profile.actions";
import { useEffect } from "react";

export type DateDayes = {
  id: number;
  date: string;
  created_at: string;
  updated_at: string;
};

export default function SelectAvilableDay({
  form,
}: {
  form: UseFormReturn<RepairRequeseFormValues>;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["avilable-days"],
    queryFn: getAllAvaliableDays,
  });

  const days: DateDayes[] = data?.data;

  const dayDate = form.watch("availableDay");

  useEffect(() => {
    if (dayDate && days?.length) {
      const formatted = dayDate.toISOString().split("T")[0];
      const day = days.find((d) => d.date === formatted);
      if (day) {
        form.setValue("availableDayId", day.id + "");
      }
    }
  }, [dayDate, days, form]);

  return (
    <FormField
      control={form.control}
      name="availableDay"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="m-0">Available Dayes</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-12 !rounded-sm border-[#F0EEF0] pl-3 text-left font-normal",

                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>Available Dayes</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                disabled={(date) => {
                  const formatted = date.toISOString().split("T")[0];
                  return !days.some((day) => day.date === formatted);
                }}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
