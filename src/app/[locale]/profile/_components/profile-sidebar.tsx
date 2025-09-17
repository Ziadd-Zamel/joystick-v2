"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { logout } from "@/lib/actions/auth.actions";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Heart, Layers, LogOut, MapPinned, ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiJoystick } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";

const ProfilenavLinks = [
  {
    url: "/profile/control-panel",
    title: "profile-route.control-panel",
    icon: Layers,
  },
  {
    url: "/profile/added-locations",
    title: "profile-route.added-locations",
    icon: MapPinned,
  },
  {
    url: "/profile/previous-orders",
    title: "profile-route.previous-orders",
    icon: ShoppingCart,
  },
  {
    url: "/profile/favourites",
    title: "profile-route.favourites",
    icon: Heart,
  },
  {
    url: "/profile/added-devices",
    title: "profile-route.added-devices",
    icon: BiJoystick,
  },
];

const ProfileSideBar = () => {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("auth_token");
      window.location.href = "/";
    },
    onError: (err) => {
      toast.error((err as Error).message);
    },
  });

  // States
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile

  // Navigation
  const pathName = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile */}
      <div className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
        <button type="button" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        dir={direction}
        className={`flex w-[90%] flex-col rounded-md border-[1px] border-solid bg-white px-2 transition-transform duration-300 lg:h-screen lg:w-64 lg:justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 h-full lg:static lg:translate-x-0`}
      >
        <button
          type="button"
          title="toggle sidebar"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className={cn(
            "absolute start-5 top-3 flex size-7 items-center justify-center rounded-full border border-black lg:hidden",
          )}
        >
          <MdClose size={24} />
        </button>

        <ul className="hide-scrollbar mt-12 flex flex-grow flex-col gap-5 space-y-0.5 space-x-reverse overflow-x-auto border-t text-xl whitespace-nowrap lg:mt-4 lg:flex lg:gap-1 lg:space-y-4 lg:overflow-hidden lg:border-none lg:whitespace-normal">
          {ProfilenavLinks.map((link, index) => (
            <li
              key={index}
              className={`lg:text-md mb-0 cursor-pointer rounded-md px-4 py-3 text-lg duration-200 lg:w-full ${
                pathName.includes(link.url) ? "lg:bg-main text-main lg:text-white" : "text-zinc-800"
              }`}
            >
              <Link href={link.url} className={""} onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon className="!size-5" />}
                  <span>{t(link.title)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Button
          className="mb-2 hidden h-auto w-full justify-start bg-red-500 py-3 text-white hover:bg-red-600 lg:flex"
          variant={"transparent"}
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="size-6" />
          {t("profile-route.sign-out")}
        </Button>

        {/* Logout Button for Mobile */}
        <Button
          className="mb-2 h-auto w-full justify-start bg-red-500 py-3 text-white hover:bg-red-600 lg:hidden"
          variant={"transparent"}
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="size-6" />
          {t("profile-route.sign-out")}
        </Button>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default ProfileSideBar;
