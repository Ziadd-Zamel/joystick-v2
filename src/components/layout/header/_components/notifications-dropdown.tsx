"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { getUserNotifications, markNotificationAsRead } from "@/lib/actions/notification.actions";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { intlFormatDistance } from "date-fns";
import { CheckCheck, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

export default function NotificationsDropdown() {
  // States
  const [selectedId, setSelectedId] = useState("");
  const queryClient = useQueryClient();

  // Translations
  const locale = useLocale();
  const t = useTranslations();

  // Inifnite query all notifications
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.data.pagination.page >= lastPage.data.pagination.total_pages;

      return isLastPage ? undefined : lastPage.data.pagination.page + 1;
    },
    refetchInterval: 6 * 10 * 1000,
  });

  // Mutations mark as read
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

  // Variables
  const allNotifications = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative !p-1">
          <IoMdNotificationsOutline className="text-primary size-7" />

          {/* NO Read notifications number */}
          {data?.pages[0].data.unread_count !== 0 && (
            <span className="absolute -end-1.5 -top-1 flex size-5 items-center justify-center rounded-full bg-[#EB5757] text-xs text-white">
              {data?.pages[0].data.unread_count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-5 w-sm rounded-sm p-1">
        <DropdownMenuLabel>{t("your-notifications")}</DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <div id="scrollableDiv" className="max-h-[400px] space-y-1 overflow-y-auto">
          {/* Skeleton */}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-22 w-full"></Skeleton>
            ))}

          {/* Inifnite scroll notificatoins */}
          {allNotifications.length !== 0 ? (
            <InfiniteScroll
              dataLength={allNotifications.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={
                <div className="space-y-1 pt-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-22 w-full rounded-md"></Skeleton>
                  ))}
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <div className="space-y-1">
                {allNotifications?.map((notification) => (
                  <React.Fragment key={notification.id}>
                    {/* Repair request notifications card design */}
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
                          {t("repair-request")}
                        </p>
                        <p className="font-medium">
                          {t("code")}:{" "}
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

                    {/* Custom notifications card design */}
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
                          {t("custom-notification")}
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
            </InfiniteScroll>
          ) : (
            <p className="font-lg text-center font-medium text-red-500">
              {t("no-notifications-found")}
            </p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
