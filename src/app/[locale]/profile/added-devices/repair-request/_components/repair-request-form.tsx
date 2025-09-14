"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectAvilableDay from "./select-avilable-day";
import SelectUserAddress from "./select-user-address";
import SelectAvaliableTime from "./select-avaliable-time";
import { Textarea } from "@/components/ui/textarea";

export const formSchema = z.object({
  address: z.any(),
  availableDay: z.any(),
  availableDayId: z.any(),
  availableTimeId: z.any(),
  extraNotes: z.any(),
});

export type RepairRequeseFormValues = z.infer<typeof formSchema>;

export default function RepairRequestForm() {
  const form = useForm<RepairRequeseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: undefined,
      availableDay: undefined,
      availableDayId: undefined,
      availableTimeId: undefined,
      extraNotes: undefined,
    },
  });

  function onSubmit(values: RepairRequeseFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 rounded-md border p-5 md:grid-cols-2">
          {/* User address */}
          <SelectUserAddress form={form} />

          {/* Avaliable Dayes */}
          <SelectAvilableDay form={form} />

          {/* Avilable time */}
          <SelectAvaliableTime form={form} />
        </div>

        <div className="rounded-md border p-5">
          <FormField
            control={form.control}
            name="extraNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4 flex flex-col items-start">
                  Extra Notes
                  <span className="text-sm font-normal text-zinc-600">
                    Add any Extra details about tht problem
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Put your notes here Max 500 chars"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
