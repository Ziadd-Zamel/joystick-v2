"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import CategoriesMenu from "./categories-menu";

export const navLinks = [
  { url: "/videos", title: "videos" },
  { url: "/about", title: "about" },
  { url: "/contact", title: "contact" },
  // { url: "/profile/added-devices", title: "maintenance" },
];
export default function NavLinks() {
  // Translation
  const t = useTranslations();
  const pathName = usePathname();

  return (
    <nav className="hidden items-center gap-3 lg:flex">
      <Link
        className={`hover:text-main cursor-pointer items-center px-2 text-center font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 xl:ltr:text-base rtl:font-bold xl:rtl:text-lg ${
          pathName === "/" ? "text-main" : ""
        } `}
        href={"/"}
      >
        {t("home")}
      </Link>

      <Link
        className={`hover:text-main cursor-pointer items-center px-2 text-center font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 xl:ltr:text-base rtl:font-bold xl:rtl:text-lg ${
          pathName === "/store" ? "text-main" : ""
        } `}
        href={"/store"}
      >
        {t("store")}
      </Link>

      <CategoriesMenu />

      {navLinks.map((link, index) => {
        return (
          <Link
            className={`hover:text-main cursor-pointer items-center px-2 text-center font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 xl:ltr:text-base rtl:font-bold xl:rtl:text-lg ${
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
  );
}
