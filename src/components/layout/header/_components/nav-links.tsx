"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import CategoriesMenu from "./categories-menu";

export const navLinks = [
  { url: "/", title: "home" },
  { url: "/about", title: "about" },
  { url: "/contact", title: "contact" },
  // { url: "/profile/added-devices", title: "maintenance" },
  { url: "/videos", title: "videos" },
  { url: "/store", title: "store" },
];
export default function NavLinks({ categories }: { categories: Category[] }) {
  // Translation
  const t = useTranslations();
  const pathName = usePathname();

  return (
    <nav className="hidden items-center gap-3 lg:flex">
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
      <CategoriesMenu categories={categories} />
    </nav>
  );
}
