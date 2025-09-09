/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface ProfileLink {
  url: string;
  title: string;
  image: string;
}

const ProfileSideBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile
  const pathName = usePathname();

  // Variables
  const ProfilenavLinks: ProfileLink[] = [
    {
      url: "/profile/control-panel",
      title: "لوحة التحكم",
      image: "/assets/icons/control-panel.svg",
    },
    {
      url: "/profile/added-location",
      title: "العناوين المضافة",
      image: "/assets/icons/location.svg",
    },
    {
      url: "/profile/previous-requests",
      title: "الطلبات السابقة",
      image: "/assets/icons/ShoppingCartSimple.svg",
    },
    { url: "/profile/favourite", title: "المفضلة", image: "/assets/icons/favourites.svg" },
    { url: "/profile/maintenance", title: "الأجهزة المضافة", image: "/assets/icons/joy.svg" },
    { url: "/profile/contuct-us", title: " تواصل معنا", image: "/assets/icons/phone.svg" },
  ];

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("token");

    if (!token) {
      console.error("Unauthorized: No token found");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Cookies.remove("token");
        window.location.reload();
      } else {
        console.error("فشل تسجيل الخروج");
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile */}
      <div className="flex items-center justify-between border-b border-gray-300 bg-white p-4 lg:hidden">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        dir={"rtl"}
        className={`flex w-[90%] flex-col rounded-sm border-[1px] border-solid border-gray-300 bg-white shadow-sm transition-transform duration-300 lg:h-screen lg:w-64 lg:justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 h-full lg:static lg:translate-x-0`}
      >
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className={
            "absolute start-5 top-3 flex size-7 items-center justify-center rounded-full border border-black lg:hidden"
          }
        >
          <MdClose size={24} />
        </button>

        <ul className="hide-scrollbar mt-12 flex flex-grow flex-col gap-5 space-x-reverse overflow-x-auto border-t text-xl whitespace-nowrap lg:mt-4 lg:flex lg:gap-0 lg:space-y-4 lg:overflow-hidden lg:border-none lg:whitespace-normal">
          {ProfilenavLinks.map((link: any, index: number) => (
            <Link
              href={link.url}
              key={index}
              className={`lg:text-md lg:hover:bg-main inline-block w-auto cursor-pointer px-4 py-3 text-lg font-semibold lg:block lg:w-full lg:hover:text-white ${
                pathName === link.url ? "lg:bg-main text-main lg:text-white" : "text-black"
              }`}
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
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
                <span>{link.title}</span>
              </div>
            </Link>
          ))}
        </ul>

        <div className="hidden lg:flex lg:flex-col lg:justify-end" onClick={handleLogout}>
          <li className="lg:text-md hover:bg-main mb-4 flex w-full cursor-pointer items-center gap-2 p-2 py-4 text-lg font-semibold hover:text-white">
            <Image width={22} height={0} src={"/assets/icons/sign-out.svg"} alt="sign out" />
            تسجيل الخروج
          </li>
        </div>

        {/* Logout Button for Mobile */}
        <div
          className="flex flex-col justify-end lg:hidden"
          onClick={() => {
            handleLogout();
            setIsOpen(false); // Close sidebar on logout
          }}
        >
          <li className="hover:bg-main mb-4 flex w-full cursor-pointer items-center gap-2 p-2 py-4 text-lg font-semibold hover:text-white">
            <Image width={22} height={0} src={"/assets/icons/sign-out.svg"} alt="sign out" />
            تسجيل الخروج
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
