"use client";
import { useState } from "react";
import { Menu, Home, Info, Wrench, Video, Grid3X3, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/routing";
import Image from "next/image";

// Nav links
const navLinks = [
  { url: "/", title: "home", icon: Home },
  { url: "/about", title: "about", icon: Info },
  { url: "/profile/maintenance", title: "maintenance", icon: Wrench },
  { url: "/videos", title: "videos", icon: Video },
];

export default function Sidebar({ categories }: { categories: Category[] }) {
  // state
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // hooks
  const local = useLocale();
  const pathName = usePathname();

  // Translation
  const t = useTranslations();

  // handle open
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="block lg:hidden" asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center text-zinc-800"
        >
          <Menu size={26} />
          <span className="sr-only">{t("navbar.openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={local === "ar" ? "right" : "left"}
        className="w-[320px] border-l border-gray-200 bg-white p-0"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="flex items-center justify-center border-b border-gray-100 p-6 pb-4">
            <Image src={"/assets/icons/logo.svg"} alt="Main-Logo" width={200} height={0} />
          </SheetHeader>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              {/* Main Navigation Links */}
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.url}
                    href={link.url}
                    onClick={() => handleOpenChange(false)}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      pathName === link.url || (link.url !== "/" && pathName.startsWith(link.url))
                        ? "border-main border-l-2 bg-teal-50 text-teal-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{t(`nav.${link.title}`)}</span>
                  </Link>
                );
              })}

              {/* Categories Section */}
              {categories && categories.length > 0 && (
                <>
                  {/* Divider */}
                  <div className="my-4 border-t border-gray-200"></div>

                  {/* Categories Collapsible */}
                  <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-all duration-1000 hover:bg-gray-50 hover:text-gray-900">
                      <div className="flex items-center space-x-3">
                        <Grid3X3 className="h-5 w-5" />
                        <span>{t("categories")}</span>
                      </div>
                      {isCategoriesOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-1">
                      <div className="space-y-1 pl-8">
                        {categories.map((category, index) => (
                          <Link
                            key={index}
                            href={`/store/${category.name}`}
                            onClick={() => handleOpenChange(false)}
                            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                              pathName === `/store/${category.name}`
                                ? "bg-teal-50 text-teal-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
