"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "@/i18n/navigation";
import { addNewAddress, updateAddress } from "@/lib/actions/profile.actions";
import { UserAddressFormValues, userAddressSchema } from "@/lib/schemas/profile.schema";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AddLatLongMap from "./add-lat-long-map";
import { Address } from "./added-address-list";

export default function AddNewAddressDialog({
  children,
  address,
}: {
  children: React.ReactNode;
  address?: Address;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("profile-route");

  const form = useForm<UserAddressFormValues>({
    resolver: zodResolver(userAddressSchema(t)),
    defaultValues: address
      ? {
          buildingNumber: address.building_number!,
          apartmentNumber: address.apartment_number!,
          floorNumber: address.floor_number!,
          addressType: address.key.slice(0, 1).toUpperCase().concat(address.key.slice(1)) as
            | "Home"
            | "Work",
          latitude: +address.latitude || 0,
          longitude: +address.longitude || 0,
          address: address.address,
        }
      : {
          buildingNumber: "",
          apartmentNumber: "",
          floorNumber: "",
          addressType: "Home",
          latitude: undefined,
          longitude: undefined,
          address: "",
        },
  });

  async function onSubmit(values: UserAddressFormValues) {
    try {
      if (address) {
        const data = await updateAddress(values, address.id);
        toast.success(data.message);
      } else {
        const data = await addNewAddress(values);
        toast.success(data.message);
        form.reset();
      }

      router.refresh();
      setTimeout(() => setOpen(false), 500);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent className="!max-w-2xl bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only" />
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
            <div className="grid max-w-[800pc] grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="buildingNumber"
                render={({ field }) => (
                  <FormItem className="!space-y-1">
                    <FormLabel className="text-sm">{t("building-number")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("building-number")} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem className="!space-y-1">
                    <FormLabel className="text-sm">{t("apartment-number")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("apartment-number")} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="floorNumber"
              render={({ field }) => (
                <FormItem className="!space-y-1">
                  <FormLabel className="text-sm">{t("floor-number")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("floor-number")} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm">{t("address-type")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex items-center gap-4 rtl:flex-row-reverse"
                    >
                      {[
                        ["Home", t("home")],
                        ["Work", t("work")],
                      ].map(([value, label], index) => (
                        <FormItem className="flex items-center space-y-0 space-x-2" key={index}>
                          <FormControl>
                            <RadioGroupItem checked={value === field.value} value={value} />
                          </FormControl>
                          <FormLabel className="m-0 text-sm font-medium">{label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="!space-y-1">
                    <FormLabel className="text-sm">{t("latitude")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("latitude")} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="!space-y-1">
                    <FormLabel className="text-sm">{t("longitude")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("longitude")} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="!space-y-1">
                  <FormLabel className="text-sm">{t("address")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("address")} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Google map */}
            <AddLatLongMap form={form} />

            <Button type="submit" className="self-start px-2">
              <Image
                alt="add Icon"
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
