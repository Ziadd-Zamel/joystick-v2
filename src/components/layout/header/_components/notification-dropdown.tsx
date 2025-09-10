"use client";

import { useRef, useState, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications, markNotificationAsRead } from "@/lib/api/notification.api";
import { useInView } from "react-intersection-observer";

interface NotificationData {
  message: string;
}

interface Notification {
  id: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
}

interface NotificationPage {
  notifications: Notification[];
  nextPage: number | null;
  totalUnread: number;
}

const NotificationDropdown = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { ref: loadMoreRef, inView } = useInView();

  // Fetch notifications with infinite scroll
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["userNotifications"],
      queryFn: getAllNotifications,
      getNextPageParam: (lastPage: NotificationPage) => lastPage.nextPage,
      staleTime: 0,
      refetchOnWindowFocus: false,
    });

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Mark as read mutation with optimistic update
  const mutation = useMutation({
    mutationFn: markNotificationAsRead,
    onMutate: async (notificationId: string) => {
      await queryClient.cancelQueries({ queryKey: ["userNotifications"] });
      const previousData = queryClient.getQueryData(["userNotifications"]);

      queryClient.setQueryData(["userNotifications"], (old: any) => {
        if (!old) return old;

        // Update the notification in all pages
        const updatedPages = old.pages.map((page: NotificationPage) => ({
          ...page,
          notifications: page.notifications.map((notification: Notification) =>
            notification.id === notificationId
              ? { ...notification, read_at: new Date().toISOString() }
              : notification,
          ),
          // Decrease total unread count by 1 if the notification was unread
          totalUnread: page.notifications.find(
            (n: Notification) => n.id === notificationId && !n.read_at,
          )
            ? page.totalUnread - 1
            : page.totalUnread,
        }));

        return {
          ...old,
          pages: updatedPages,
        };
      });

      return { previousData };
    },
    onError: (err: any, newTodo: any, context: any) => {
      queryClient.setQueryData(["userNotifications"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userNotifications"]);
    },
  });

  // Get all notifications from all pages
  const notifications = data?.pages.flatMap((page: NotificationPage) => page.notifications) || [];
  // Get total unread from the first page (API sends total in every response)
  const totalUnread = data?.pages[0]?.totalUnread || 0;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id: string) => {
    mutation.mutate(id);
  };

  const toggleReadMore = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotifications(newExpanded);
  };

  // Format date to Arabic/English
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} دقيقة`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ساعة`;
    } else {
      return `${diffInDays} يوم`;
    }
  };

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  useEffect(() => {
    // Get token from cookies
    const getTokenFromCookies = (): string | null => {
      const name = "token=";
      const decodedCookies = decodeURIComponent(document.cookie);
      const cookies = decodedCookies.split(";");

      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name)) {
          return cookie.substring(name.length);
        }
      }

      return null;
    };

    const tokenValue = getTokenFromCookies();
    setToken(tokenValue);
  }, []);

  if (!token) return null;

  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        className="bg-primary/5 relative rounded-[8px] p-2.5 transition-colors"
        onClick={toggleDropdown}
        aria-label="الإشعارات"
        aria-expanded={isOpen}
      >
        <div className="relative">
          <IoMdNotificationsOutline className="h-6 w-6 text-[#02A09B]" />
          {totalUnread > 0 && (
            <span className="absolute -top-2.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EB5757] text-xs text-white">
              {totalUnread}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={dropdownRef}
            className="fixed top-0 right-0 left-0 z-50 mt-0 flex h-[100dvh] w-full flex-col bg-white shadow-lg lg:absolute lg:top-full lg:right-auto lg:left-[150px] lg:mt-4 lg:h-[600px] lg:w-[370px] lg:-translate-x-1/2 lg:rounded-xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6">
              <h1 className="text-xl font-bold">الإشعارات</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-1 items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
              </div>
            ) : isError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
                <div className="w-full rounded-lg bg-red-100 p-4 text-center text-red-700">
                  حدث خطأ في تحميل الإشعارات
                </div>
                <button
                  onClick={() => queryClient.invalidateQueries(["userNotifications"])}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mb-4 h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
                <p className="text-center">لا توجد إشعارات جديدة</p>
              </div>
            ) : (
              <ul className="flex-1 divide-y divide-gray-200 overflow-auto">
                {notifications.map((notification) => {
                  const message = notification.data.message;
                  const isLongMessage = message.length > 75;
                  const isExpanded = expandedNotifications.has(notification.id);

                  return (
                    <li
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`relative p-6 ${
                        notification.read_at ? "bg-white" : "bg-[#f2fafa]"
                      } cursor-pointer transition-colors duration-100 hover:bg-gray-50`}
                    >
                      <div className="flex w-full items-center">
                        <span
                          className={`relative me-4 rounded-full bg-[#E9EBF8] p-4 ${
                            notification.read_at ? "bg-[#f2fafa]" : "bg-white"
                          }`}
                        >
                          <IoMdNotificationsOutline className="text-primary h-5 w-5" />
                        </span>

                        <div className="flex-1">
                          <div className="mb-3 flex justify-between">
                            <h4 className="text-base text-zinc-800">الرسالة</h4>
                            <span className="flex items-center text-xs text-zinc-500">
                              {formatDate(notification.created_at)}
                            </span>
                          </div>

                          <p className="text-[12px] text-zinc-500">
                            {isLongMessage && !isExpanded ? `${message.slice(0, 75)}...` : message}
                            {isLongMessage && (
                              <button
                                onClick={(e) => toggleReadMore(notification.id, e)}
                                className="text-primary hover:text-primary/80 mr-1 underline focus:outline-none"
                              >
                                {isExpanded ? "عرض أقل" : "عرض المزيد"}
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}

                {/* Loading more indicator */}
                <li ref={loadMoreRef} className="flex justify-center p-4">
                  {isFetchingNextPage && (
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
                  )}
                </li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
