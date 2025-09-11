import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPrevOrders } from "@/lib/actions/profile.actions";
import { getTranslations } from "next-intl/server";

type Device = {
  id: number;
  name: string;
  model: string;
  serial_number?: string;
};

type Repair = {
  id: number;
  code: string;
  created_at: string;
  devices: Device[];
  status: "pending" | "in_progress" | "completed" | "cancelled";
};

export default async function PrevOrdersMaintenanceTable() {
  const t = await getTranslations("profile-route");

  const payload = await getPrevOrders("repair");
  const orderData: Repair[] = payload.data.data;

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="text-base">
        <TableHeader className="bg-main/5 h-12">
          <TableRow>
            <TableHead className="text-center">{t("order-number")}</TableHead>
            <TableHead className="text-center">{t("order-type")}</TableHead>
            <TableHead className="text-center">{t("status")}</TableHead>
            <TableHead className="text-center">{t("order-date")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-zinc-700">
          {orderData.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="text-center">{order.code}</TableCell>
              <TableCell className="text-center">Maintenance</TableCell>
              <TableCell className="text-center">{order.status}</TableCell>
              <TableCell className="text-center">{order.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
