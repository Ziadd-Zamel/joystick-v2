import { fetchUserAddresses } from "@/lib/actions/profile.actions";
import { FaPen } from "react-icons/fa";
import AddNewAddressDialog from "./add-new-address-dialog";
import DeleteAddressDialog from "./delete-address-diallog";

export type Address = {
  id: number;
  user_id: number;
  key: string;
  is_main: 0 | 1;

  address: string;
  address_link: string;
  apartment_number: string | null;
  area: string | null;
  building_number: string | null;
  city: string | null;
  floor_number: string | null;
  governorate: string | null;
  grand_address: string;

  latitude: string;
  longitude: string;

  created_at: string;
  updated_at: string;
};

export default async function AddedAddressesList() {
  const addresses: Address[] = await fetchUserAddresses();

  return (
    <div className="space-y-2 p-4">
      {addresses.map((address: Address) => (
        <div
          key={address.id}
          className="flex min-h-[100px] w-full flex-row rounded-xl border-[1px] border-solid border-[#E4E7E9] px-6 py-4"
        >
          <div className="w-full space-y-5">
            <div className="flex justify-between">
              {/* Address key / type */}
              <h3 className="text-xl font-medium capitalize">{address.key}</h3>
              <div className="flex items-center justify-center gap-4">
                {/* Edit dialog */}
                <AddNewAddressDialog address={address}>
                  <FaPen className="text-main size-5" />
                </AddNewAddressDialog>

                {/* Delete dialog */}
                <DeleteAddressDialog addressId={address.id} />
              </div>
            </div>
            <div className="flex justify-between">
              {/* full Address */}
              <p className="max-w-lg text-[#666666]">{address.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
