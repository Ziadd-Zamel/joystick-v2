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
import { getAllAvilableDays } from "@/lib/actions/profile.actions";

export default function SelectAvilableDay({
  form,
}: {
  form: UseFormReturn<RepairRequeseFormValues>;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["avilable-days"],
    queryFn: getAllAvilableDays,
  });

  const days = data.data;

  console.log("days", days);

  return (
    <FormField
      control={form.control}
      name="availableDayes"
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
                // disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
