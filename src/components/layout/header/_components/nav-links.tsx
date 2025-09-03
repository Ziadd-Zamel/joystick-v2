"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import CategoriesMenu from "./categories-menu";

export const navLinks = [
  { url: "/", title: "home" },
  { url: "/about", title: "about" },
  { url: "/profile/maintenance", title: "maintenance" },
  { url: "/videos", title: "videos" },
];
export default function NavLinks({ categories }: { categories: Category[] }) {
  // Translation
  const t = useTranslations("nav");
  const pathName = usePathname();

  return (
    <nav className="hidden items-center gap-3 lg:flex">
      {navLinks.map((link, index) => {
        return (
          <Link
            className={`hover:text-main text-md xl:ltr:text-md cursor-pointer items-center px-2 text-center font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 xl:text-lg rtl:font-bold ${
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
