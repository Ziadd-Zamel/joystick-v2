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
          <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 rtl:flex-row-reverse">
            <div
              className="grid auto-cols-max grid-flow-col gap-x-8"
              style={{ gridTemplateRows: "repeat(4, auto)" }}
            >
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category.name}/${category.id}`}
                  className="hover:text-main w-full rounded-md px-4 py-2 text-right text-sm font-medium text-gray-900 transition-colors"
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
