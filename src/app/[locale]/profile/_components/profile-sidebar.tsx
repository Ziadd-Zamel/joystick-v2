/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

interface ProfileLink {
  url: string;
  title: string;
  image: string;
}

const ProfilenavLinks: ProfileLink[] = [
  {
    url: "/profile/control-panel",
    title: "profile-route.control-panel",
    image: "/assets/icons/control-panel.svg",
  },
  {
    url: "/profile/added-locations",
    title: "profile-route.added-locations",
    image: "/assets/icons/location.svg",
  },
  {
    url: "/profile/previous-requests",
    title: "profile-route.previous-requests",
    image: "/assets/icons/ShoppingCartSimple.svg",
  },
  {
    url: "/profile/favourite",
    title: "profile-route.favourite",
    image: "/assets/icons/favourites.svg",
  },
  {
    url: "/profile/maintenance",
    title: "profile-route.maintenance",
    image: "/assets/icons/joy.svg",
  },
  {
    url: "/profile/contact-us",
    title: "profile-route.contact-us",
    image: "/assets/icons/phone.svg",
  },
];

const ProfileSideBar = () => {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // States
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile

  // Navigation
  const pathName = usePathname();

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("auth_token");

    if (!token) {
      console.error("Unauthorized: No token found");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error Logging out");
      }

      Cookies.remove("auth_token");
      window.location.href = "/";
    } catch (err) {
      console.error("Error", err);
      toast.error((err as Error).message);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-white p-4 lg:hidden">
        <button type="button" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        dir={direction}
        className={`flex w-[90%] flex-col rounded-sm border-[1px] border-solid border-gray-300 bg-white shadow-sm transition-transform duration-300 lg:h-screen lg:w-64 lg:justify-between ${
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

        <ul className="hide-scrollbar mt-12 flex flex-grow flex-col gap-5 space-x-reverse overflow-x-auto border-t text-xl whitespace-nowrap lg:mt-4 lg:flex lg:gap-0 lg:space-y-4 lg:overflow-hidden lg:border-none lg:whitespace-normal">
          {ProfilenavLinks.map((link: any, index: number) => (
            <li
              key={index}
              className={`lg:text-md lg:hover:bg-main mb-0 cursor-pointer px-4 py-3 text-lg duration-200 lg:w-full lg:hover:text-white ${
                pathName.includes(link.url) ? "lg:bg-main text-main lg:text-white" : "text-zinc-800"
              }`}
            >
              <Link href={link.url} className={""} onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-2">
                  {link.image && (
                    <Image
                      src={link.image}
                      alt={link.title}
                      width={22}
                      height={22}
                      className={`transition duration-200 ${
                        pathName === link.url ? "icon-white" : ""
                      }`}
                    />
                  )}
                  <span>{t(link.title)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex lg:flex-col lg:justify-end" onClick={handleLogout}>
          <li className="lg:text-md hover:bg-main mb-4 flex w-full cursor-pointer items-center gap-2 p-2 py-4 text-lg font-semibold hover:text-white">
            <Image width={22} height={0} src={"/assets/icons/sign-out.svg"} alt="sign out" />
            {t("profile-route.sign-out")}
          </li>
        </div>

        {/* Logout Button for Mobile */}
        <div
          className="flex flex-col justify-end lg:hidden"
          onClick={() => {
            handleLogout();
          }}
        >
          <li className="hover:bg-main mb-4 flex w-full cursor-pointer items-center gap-2 p-2 py-4 text-lg font-semibold hover:text-white">
            <Image width={22} height={0} src={"/assets/icons/sign-out.svg"} alt="sign out" />
            {t("sign-out")}
          </li>
        </div>
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
