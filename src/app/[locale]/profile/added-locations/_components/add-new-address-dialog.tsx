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
import { z } from "zod";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddLatLongMap from "./add-lat-long-map";
import { addNewAddress, updateAddress } from "@/lib/actions/profile.actions";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { Address } from "./added-address-list";

export const userAddressSchema = z.object({
  buildingNumber: z.any(),
  apartmentNumber: z.any(),
  floorNumber: z.any(),
  addressType: z.any(),
  latitude: z.any(),
  longitude: z.any(),
  address: z.any(),
});

export type UserAddressFormValues = z.infer<typeof userAddressSchema>;

export default function AddNewAddressDialog({
  children,
  address,
}: {
  children: React.ReactNode;
  address?: Address;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<UserAddressFormValues>({
    resolver: zodResolver(userAddressSchema),
    defaultValues: address
      ? {
          buildingNumber: address.building_number,
          apartmentNumber: address.apartment_number,
          floorNumber: address.floor_number,
          addressType: address.key.slice(0, 1).toUpperCase().concat(address.key.slice(1)),
          latitude: address.latitude,
          longitude: address.longitude,
          address: address.address,
        }
      : {
          buildingNumber: "",
          apartmentNumber: "",
          floorNumber: "",
          addressType: "Home",
          latitude: "",
          longitude: "",
          address: "",
        },
  });

  async function onSubmit(values: UserAddressFormValues) {
    console.log(values);
    try {
      if (address) {
        const data = await updateAddress(values, address.id);
        console.log("address res data", data);
        toast.success(data.message);
      } else {
        const data = await addNewAddress(values);
        console.log("address res data", data);
        toast.success(data.message);
      }

      router.refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
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
                    <FormLabel className="text-sm">Building Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Building Number" type="" {...field} />
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
                    <FormLabel className="text-sm">Apartment Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment Number" type="text" {...field} />
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
                  <FormLabel className="text-sm">Floor Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Floor Number" type="text" {...field} />
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
                  <FormLabel className="text-sm">Address Type</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} className="flex items-center gap-4">
                      {[
                        ["Home", "Home"],
                        ["Work", "Work"],
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="!space-y-1">
                    <FormLabel className="text-sm">latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="latitude" type="text" {...field} />
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
                    <FormLabel className="text-sm">longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="longitude" type="text" {...field} />
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
                  <FormLabel className="text-sm">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
