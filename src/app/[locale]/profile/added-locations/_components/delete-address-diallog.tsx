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

export default function DeleteAddressDialog({ addressId }: { addressId: number }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="cursor-pointer">
        <BsTrash3 className="text-main size-5" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Address and remove it
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
