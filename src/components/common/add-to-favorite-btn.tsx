"use client";

import { useRouter } from "@/i18n/routing";
import { toggleFavouriteProduct } from "@/lib/actions/cart.actions";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Heart, HeartPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  productId: number;
  isFav: boolean;
  className?: string;
};

export default function AddToFavoriteButton({ productId, className, isFav = false }: Props) {
  // Translations
  const router = useRouter();

  // Mutations
  const addProductToFavourites = useMutation({
    mutationFn: toggleFavouriteProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        addProductToFavourites.mutate(productId);
      }}
      className={cn(
        "flex-center center absolute top-2 left-2 z-30 cursor-pointer bg-white !px-2 !py-2 shadow-sm hover:scale-[1.05] hover:bg-white",
        className,
      )}
    >
      {addProductToFavourites.isPending ? (
        <Loader2 className="text-main size-6 animate-spin" />
      ) : (
        <>
          {isFav ? (
            <Heart className="size-6 fill-red-500 stroke-red-500" />
          ) : (
            <HeartPlus className="size-6 text-zinc-900" />
          )}
        </>
      )}
    </Button>
  );
}
