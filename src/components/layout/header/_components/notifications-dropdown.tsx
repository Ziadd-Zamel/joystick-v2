import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function NotificationsDropdown() {
  const isRead = false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative !p-1">
          <IoMdNotificationsOutline className="text-primary size-7" />

          <span className="absolute -end-1.5 -top-1 flex size-5 items-center justify-center rounded-full bg-[#EB5757] text-xs text-white">
            5
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-5 w-sm rounded-sm p-1">
        <DropdownMenuLabel>Your Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <div className="max-h-[400px] space-y-1 overflow-y-auto">
          <div
            className={cn("relative min-h-22 rounded-sm rounded-s-none bg-zinc-100 p-2", {
              "bg-main/10 border-s-main border-s-4": !isRead,
            })}
          >
            hello
            {!isRead && (
              <Button className="absolute end-1 top-1 size-7 rounded-sm">
                <CheckCheck className="size-5" />
              </Button>
            )}
          </div>

          <div
            className={cn("relative min-h-22 rounded-sm bg-zinc-100 p-2", {
              "bg-main/10": isRead,
            })}
          >
            hello
            {isRead && (
              <Button className="absolute end-1 top-1 size-7 rounded-sm">
                <CheckCheck className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
