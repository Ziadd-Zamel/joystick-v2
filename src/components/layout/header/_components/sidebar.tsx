"use client";

import { useState } from "react";

import { Menu, User, Settings, LogOut, Home, Coffee, Heart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const local = useLocale();
  const t = useTranslations();
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const navigationLinks = [
    { href: "/", label: t("navbar.home"), active: true, icon: Home },
    { href: "/restaurants", label: t("navbar.restaurants"), active: false, icon: UtensilsCrossed },
    { href: "/coffee-shops", label: t("navbar.coffeeShops"), active: false, icon: Coffee },
    { href: "/favourite", label: t("navbar.favourite"), active: false, icon: Heart },
  ];

  const userMenuItems = [
    { href: "/profile", label: t("sidebar.profile"), icon: User },
    { href: "/settings", label: t("sidebar.settings"), icon: Settings },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden block" asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-800 flex items-center justify-center"
        >
          <Menu size={26} />
          <span className="sr-only">{t("navbar.openMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={local === "ar" ? "right" : "left"}
        className="w-[320px] p-0 bg-white border-l border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <SheetHeader className="p-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-teal-100">
                <AvatarImage src="/abstract-profile.png" alt="User avatar" />
                <AvatarFallback className="bg-main text-white font-semibold">U</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </SheetHeader>

          {/* Navigation Links */}
          <div className="flex-1 px-6 py-4">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {t("sidebar.navigation")}
              </h4>
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleOpenChange(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200  ${
                      link.active
                        ? "bg-teal-50 text-teal-700 border-l-4 border-main"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <Separator className="my-6" />

            {/* User Menu */}
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {t("sidebar.account")}
              </h4>
              {userMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => handleOpenChange(false)}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                handleOpenChange(false);
              }}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {t("sidebar.signOut")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
