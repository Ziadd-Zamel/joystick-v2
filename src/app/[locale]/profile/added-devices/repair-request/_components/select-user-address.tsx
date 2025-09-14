import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUserAddresses } from "@/lib/actions/profile.actions";
import { useQuery } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { Address } from "../../../added-locations/_components/added-address-list";
import { useTranslations } from "next-intl";
import { RepairRequeseFormValues } from "@/lib/schemas/profile.schema";

export default function SelectUserAddress({
  form,
}: {
  form: UseFormReturn<RepairRequeseFormValues>;
}) {
  const t = useTranslations("profile-route");
  const {
    data: userAddresses,
    isLoading,
    isFetching,
  } = useQuery<Address[]>({
    queryKey: ["user-address"],
    queryFn: fetchUserAddresses,
  });

  return (
    <FormField
      control={form.control}
      name="addressId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="m-0">{t("address")}</FormLabel>
          <Select
            disabled={isLoading || isFetching}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="!h-12 w-full rounded-sm border-[#F0EEF0]">
                <SelectValue placeholder={t("address")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {userAddresses?.map((userAddress) => (
                <SelectItem key={userAddress.id} value={userAddress.id + ""}>
                  {userAddress.grand_address}
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
