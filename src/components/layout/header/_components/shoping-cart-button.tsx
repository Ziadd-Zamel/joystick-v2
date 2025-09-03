import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function ShoppingCartButton() {
  return (
    <Button variant={"ghost"}>
      <ShoppingCart size={28} strokeWidth={1.3} />
    </Button>
  );
}
