"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "@/i18n/routing";
import { addDevice } from "@/lib/actions/profile.actions";
import Image from "next/image";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { addDeviceFormSchema, AddDeviceFormValues } from "@/lib/schemas/profile.schema";

export default function AddDeviceDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("profile-route");

  const form = useForm<AddDeviceFormValues>({
    resolver: zodResolver(addDeviceFormSchema(t)),
    defaultValues: {
      deviceName: "",
      serialNumber: "",
      deviceStatus: "new",
      purchaseDate: undefined,
    },
  });

  async function onSubmit(values: AddDeviceFormValues) {
    try {
      const data = await addDevice(values);
      console.log("address res data", data);
      toast.success(data.message);
      form.reset();

      router.refresh();
      setTimeout(() => setOpen(false), 500);
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">
        <Image alt="add Icon" width={25} height={25} src={"/assets/icons/add-address.svg"} />
      </DialogTrigger>
      <DialogContent className="!max-w-lg bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only" />
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
            {/* Device Name */}
            <FormField
              control={form.control}
              name="deviceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("device-name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("device-name")} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Serial Number */}
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("serial-number")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("serial-number")} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Device Status */}
            <FormField
              control={form.control}
              name="deviceStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t("device-status")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex items-center gap-4 rtl:flex-row-reverse"
                    >
                      {[
                        [t("device-status-new"), "new"],
                        [t("device-status-old"), "old"],
                        [t("device-status-used"), "used"],
                      ].map((option, index) => (
                        <FormItem className="flex items-center space-y-0 space-x-2" key={index}>
                          <FormControl>
                            <RadioGroupItem checked={option[1] === field.value} value={option[1]} />
                          </FormControl>
                          <FormLabel className="m-0 text-sm font-medium">{option[0]}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Purchase Date */}
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("purchase-date")}</FormLabel>
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
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t("purchase-date-placeholder")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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

            {/* Submit */}
            <Button type="submit" className="self-start px-2">
              <Image
                alt={t("submit-button")}
                width={25}
                height={25}
                src={"/assets/icons/add-to-cart-icon.svg"}
              />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
