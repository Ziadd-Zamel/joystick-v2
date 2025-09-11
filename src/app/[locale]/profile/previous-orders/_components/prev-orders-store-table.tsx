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

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  order_number: string;
  created_at: string;
  products: Product[];
  status: "pending" | "completed" | "cancelled" | "shipped";
  total_price: string;
};

export default async function PrevOrdersTable() {
  const t = await getTranslations("profile-route");
  const payload = await getPrevOrders("store");
  const orderData: Order[] = payload.data.data;

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="text-base">
        <TableHeader className="bg-main/5 h-12">
          <TableRow>
            <TableHead className="text-center">{t("order-number")}</TableHead>
            <TableHead className="text-center">{t("full-price")}</TableHead>
            <TableHead className="text-center">{t("status")}</TableHead>
            <TableHead className="text-center">{t("order-date")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-zinc-700">
          {orderData.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="text-center">{order.order_number}</TableCell>
              <TableCell className="text-center">{order.total_price}</TableCell>
              <TableCell className="text-center">{order.status}</TableCell>
              <TableCell className="text-center">{order.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
