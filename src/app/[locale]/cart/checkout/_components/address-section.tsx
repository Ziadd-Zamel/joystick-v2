import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface AddressSectionProps {
  userAddresses: Address[];
  selectedAddressId: string;
  onAddressChange: (addressId: string) => void;
}

export default function AddressSection({
  userAddresses,
  selectedAddressId,
  onAddressChange,
}: AddressSectionProps) {
  const t = useTranslations("address");

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-medium rtl:text-3xl">{t("address")}</h2>
        <Link
          className="text-sm font-medium text-[#02A09B] rtl:text-xl"
          href={"/profile/added-locations"}
        >
          {t("change")}
        </Link>
      </div>
      <Card className="bg-white shadow-sm">
        <CardContent>
          <RadioGroup value={selectedAddressId} onValueChange={onAddressChange}>
            <div className="space-y-4">
              {userAddresses.map((address) => (
                <Label
                  key={address.id}
                  htmlFor={`address-${address.id}`}
                  className="flex cursor-pointer items-start justify-between rounded-lg border p-4 hover:bg-gray-50"
                  dir={"ltr"}
                >
                  <RadioGroupItem
                    value={address.id.toString()}
                    id={`address-${address.id}`}
                    className="mt-1"
                  />
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-600">{address.key}</div>
                    <div className="mt-10 text-sm text-gray-600">{address.address}</div>
                  </div>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
