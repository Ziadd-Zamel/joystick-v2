"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectAvilableDay from "./select-avilable-day";
import SelectUserAddress from "./select-user-address";

export const formSchema = z.object({
  address: z.any(),
  availableDayes: z.any(),
});

export type RepairRequeseFormValues = z.infer<typeof formSchema>;

export default function RepairRequestForm() {
  const form = useForm<RepairRequeseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableDayes: undefined,
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
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
