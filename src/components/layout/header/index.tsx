"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./_components/login-button";
import { usePathname } from "@/i18n/routing";

export const navLinks = [
  { url: "/", title: "home" },
  { url: "/about", title: "about" },
  { url: "/profile/maintenance", title: "maintenance" },
  { url: "/videos", title: "videos" },
];

export default function Navbar() {
  // Translation
  const t = useTranslations("nav");
  const pathName = usePathname();
  return (
    <>
      <header className="p-4 shadow-md shadow-[#EEEEEE80]">
        <div className="box-container flex items-center justify-between">
          <Link href="/" className="relative hidden h-12 w-40 lg:flex">
            <Image src={"/assets/icons/logo.svg"} alt="Logo" fill className="w-full" />
          </Link>{" "}
          <nav className="flex items-center gap-3">
            {navLinks.map((link, index) => {
              return (
                <Link
                  className={`hover:text-main xl:text-md text-md inline-flex cursor-pointer items-center px-2 text-center font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 2xl:text-lg ${
                    pathName === link.url ? "text-main" : ""
                  } `}
                  key={index}
                  href={link.url}
                >
                  {t(link.title)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-5">
            <LoginButton />
          </div>
        </div>
      </header>
    </>
  );
}
