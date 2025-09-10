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
import { deleteAddress } from "@/lib/actions/profile.actions";
import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function DeleteAddressDialog({ addressId }: { addressId: number }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("profile-route");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer">
        <BsTrash3 className="text-main size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("delete-confirm-title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("delete-confirm-description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-self-start">
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const data = await deleteAddress(addressId);

                toast.success(data.message);
                router.refresh();
                setOpen(false);
              } catch (err) {
                toast.error((err as Error).message);
              }
            }}
          >
            <AlertDialogAction type="submit">{t("continue")}</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
