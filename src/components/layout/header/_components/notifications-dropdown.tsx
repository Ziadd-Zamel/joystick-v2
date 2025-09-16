"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import { getUserNotifications, markNotificationAsRead } from "@/lib/actions/notification.actions";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { intlFormatDistance } from "date-fns";
import { CheckCheck, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { toast } from "sonner";

type RepairRequestData = {
  message: string;
  code: string;
  date: string; // "2025-09-14 15:30:41"
};

type CustomNotificationData = {
  title: string;
  body: string;
  product_id: number;
  image: string;
};

type BaseNotification<T extends string, D> = {
  id: string;
  type: T;
  data: D;
  read_at: string | null;
  created_at: string;
};

export type Notification =
  | BaseNotification<"RepairRequestNotification", RepairRequestData>
  | BaseNotification<"CustomNotification", CustomNotificationData>;

export type NotificationResponse = {
  success: boolean;
  message: string;
  data: {
    data: Notification[];
    pagination: {
      page: number;
      total_pages: number;
      total_items: number;
      limit: number;
    };
  };
};

export default function NotificationsDropdown() {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading } = useQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: getUserNotifications,
    refetchInterval: 60 * 1000,
  });

  const allNotifications = data?.data.data;

  const { mutate, isPending } = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      toast.success(data.message || "success");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative !p-1">
          <IoMdNotificationsOutline className="text-primary size-7" />

          <span className="absolute -end-1.5 -top-1 flex size-5 items-center justify-center rounded-full bg-[#EB5757] text-xs text-white">
            {allNotifications?.length || 0}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-5 w-sm rounded-sm p-1">
        <DropdownMenuLabel>Your Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <div className="max-h-[400px] space-y-1 overflow-y-auto">
          {allNotifications?.map((notification) => (
            <React.Fragment key={notification.id}>
              {notification.type === "RepairRequestNotification" && (
                <div
                  className={cn(
                    "relative flex min-h-22 flex-col rounded-sm bg-zinc-100 p-2 text-sm",
                    {
                      "bg-main/10 border-s-main border-s-4": !notification.read_at,
                    },
                  )}
                >
                  <p className="text-main mb-1 flex items-center gap-2 font-medium">
                    <HiOutlineWrenchScrewdriver className="size-4" />
                    Repair Requrest
                  </p>
                  <p className="font-medium">
                    Code:{" "}
                    <Link
                      href={`/profile/previous-orders/?orderType=repair`}
                      className="text-blue-600 underline-offset-2 hover:underline"
                    >
                      {notification.data.code}
                    </Link>
                  </p>
                  <p className="mb-1 leading-4">{notification.data.message}</p>
                  <p
                    className={cn("self-end text-xs font-medium text-zinc-600", {
                      "text-main": !notification.read_at,
                    })}
                  >
                    {intlFormatDistance(new Date(notification.created_at), new Date(), {
                      locale: locale,
                    })}
                  </p>

                  {!notification.read_at && (
                    <Button
                      onClick={() => {
                        setSelectedId(notification.id);
                        mutate(notification.id);
                      }}
                      disabled={isPending && selectedId === notification.id}
                      className="absolute end-1 top-1 size-6 rounded-sm"
                    >
                      {isPending && selectedId === notification.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <CheckCheck className="size-4" />
                      )}
                    </Button>
                  )}
                </div>
              )}

              {notification.type === "CustomNotification" && (
                <div
                  className={cn(
                    "relative flex min-h-22 flex-col rounded-sm bg-zinc-100 p-2 text-sm",
                    {
                      "bg-main/10 border-s-main border-s-4": !notification.read_at,
                    },
                  )}
                >
                  <p className="text-main mb-1 flex items-center gap-2 font-medium">
                    <MdOutlineNotificationsActive className="size-5" />
                    Custome Notification
                  </p>
                  <p className="font-medium">{notification.data.title}</p>
                  <p className="mb-1 leading-4">{notification.data.body}</p>
                  <p
                    className={cn("self-end text-xs font-medium text-zinc-600", {
                      "text-main": !notification.read_at,
                    })}
                  >
                    {intlFormatDistance(new Date(notification.created_at), new Date(), {
                      locale: locale,
                    })}
                  </p>
                  {!notification.read_at && (
                    <Button
                      onClick={() => {
                        setSelectedId(notification.id);
                        mutate(notification.id);
                      }}
                      disabled={isPending && selectedId === notification.id}
                      className="absolute end-1 top-1 size-6 rounded-sm"
                    >
                      {isPending && selectedId === notification.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <CheckCheck className="size-4" />
                      )}
                    </Button>
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
