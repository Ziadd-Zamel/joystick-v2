"use client";

import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteCart } from "../hooks/use-delete-from-cart";
import { cn } from "@/lib/utils";

interface Props {
  productId: string;
}

export default function DeleteCartItem({ productId }: Props) {
  const deleteMutation = useDeleteCart();

  const handleDelete = () => {
    deleteMutation.mutate(productId);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "size-10 transition-all duration-200",
        deleteMutation.isPending && "cursor-not-allowed opacity-50",
      )}
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? (
        <div className="size-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#02A09B]" />
      ) : (
        <IoTrashOutline className="size-8 text-[#02A09B] transition-colors duration-200 hover:text-[#02A09B]/80" />
      )}
    </Button>
  );
}
