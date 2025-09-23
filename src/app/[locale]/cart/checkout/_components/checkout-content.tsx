"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import AddressSection from "./address-section";
import UserInfoForm from "./user-Info-form";
import DiscountSection from "../../_components/discount-section";

export default function CheckoutContent({
  CartItems,
  userAddresses,
}: {
  CartItems: Cart[];
  userAddresses: Address[];
}) {
  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    userAddresses.length > 0 ? userAddresses[0].id.toString() : "",
  );

  // Function to handle address change
  const handleAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  return (
    <div className="box-container flex flex-col items-start justify-between gap-5 py-20 lg:flex-row">
      <div className="w-full space-y-4 lg:w-[60%]">
        <AddressSection
          userAddresses={userAddresses}
          selectedAddressId={selectedAddressId}
          onAddressChange={handleAddressChange}
        />
        <Card className="bg-white shadow-sm">
          <UserInfoForm />
        </Card>
      </div>
      <div className="mt-[55px] h-full w-full lg:w-[35%]">
        <DiscountSection
          showCouponInput
          shipping={20}
          cartItems={CartItems}
          address={Number(selectedAddressId)}
        />
      </div>
    </div>
  );
}
