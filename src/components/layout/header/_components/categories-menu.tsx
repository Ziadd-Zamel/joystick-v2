"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CategoriesMenu({ categories }: { categories: Category[] }) {
  // Translation
  const t = useTranslations();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-base font-medium rtl:font-bold xl:rtl:text-xl">
            {t("categories")}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="max-h-[250px] overflow-y-auto text-nowrap md:left-1/2 md:-translate-x-1/2 rtl:flex-row-reverse">
            <div
              className="grid w-full grid-cols-2 gap-3"
              style={{
                gridTemplateRows: "repeat(4, auto)",
                gridTemplateColumns: "repeat(2, auto)",
              }}
            >
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category.name}/${category.id}`}
                  className="hover:bg-main w-full rounded-md bg-zinc-100 p-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
