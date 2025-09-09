import { fetchUserAddresses } from "@/lib/actions/profile.actions";
import { BsTrash3 } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

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
  console.log("user address", addresses);

  return (
    <div className="space-y-2 p-4">
      {addresses.map((address: Address) => (
        <div
          key={address.id}
          className="flex min-h-[100px] w-full flex-row rounded-xl border-[1px] border-solid border-[#E4E7E9] px-6 py-4"
        >
          <div className="w-full space-y-5">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">{address.key}</h3>
              <div className="flex items-center justify-center gap-4">
                <button>
                  <FaPen className="text-main size-5" />
                </button>
                <button>
                  <BsTrash3 className="text-main size-5" />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="max-w-lg text-[#666666]">{address.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
