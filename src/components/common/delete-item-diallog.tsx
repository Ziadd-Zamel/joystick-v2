"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "sonner";

/* 
NOTE: Usage <DeleteItemDialog action={deleteAddress.bind(null, address.id)} />
*/

export default function DeleteItemDialog({
  action,
  itemName,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => Promise<any>;
  itemName: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: () => action(),
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
      setOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer">
        <BsTrash3 className="text-main size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-confirm-title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete-confirm-description", { itemName: t(itemName) })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-self-start">
          <AlertDialogCancel disabled={mutation.isPending}>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="size-6 animate-spin text-white" />
            ) : (
              t("continue")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
