import DeleteItemDialog from "@/components/common/delete-item-diallog";
import { Link } from "@/i18n/routing";
import { deleteDevice, getAddedDevices } from "@/lib/actions/profile.actions";
import Image from "next/image";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

export type Device = {
  id: number;
  user_id: number;
  device_name: string;
  serial_number: string;
  status: "used" | "new" | "old";
  purchase_date: string;
  created_at: string;
  updated_at: string;
};

export default async function AddedDevicesList() {
  const payload = await getAddedDevices();
  const devices: Device[] = payload.data.data;

  if (!devices.length)
    return <p className="mt-10 text-center text-lg font-medium text-red-600">No Devices found</p>;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {devices.map((device) => (
        <div
          key={device.id}
          className="flex flex-col items-center gap-4 rounded-md p-3 shadow-md md:flex-row"
        >
          <div className="relative aspect-video h-40 overflow-hidden rounded-lg bg-white shadow md:aspect-square md:h-auto md:w-30">
            <Image
              src={"/assets/images/controller.png"}
              alt={device.device_name}
              fill
              loading="lazy"
              sizes="34vw"
              className="object-contain"
            />
          </div>

          <div className="flex-1 space-y-1">
            <p className="text-lg font-semibold">{device.device_name}</p>
            <p className="text-sm">
              Device Number: <span className="font-medium">{device.serial_number}</span>
            </p>
            <p className="text-sm">
              Status: <span className="font-medium">{device.status}</span>
            </p>
            <p className="text-sm">
              Purchase
              <br /> Date: <span className="font-medium">{device.purchase_date}</span>
            </p>
          </div>
          <div className="flex flex-col items-end justify-between gap-2 self-stretch py-3">
            {/* Remove Device */}
            <DeleteItemDialog action={deleteDevice.bind(null, device.id)} itemName="device" />

            {/* Request Maintencnce */}
            <Link
              href={`/profile/added-devices/repair-request/${device.id}`}
              className="text-main flex items-center gap-2 font-medium underline-offset-2"
            >
              <HiOutlineWrenchScrewdriver className="size-5" />
              Repair
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
