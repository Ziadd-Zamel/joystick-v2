"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { type Locale } from "next-intl";
import { Globe, LogOut } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import Cookies from "js-cookie";

export function UserDropdown() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Language switching function
  const switchLocale = (newLocale: Locale) => {
    const params = searchParams.toString();
    const url = params ? `${pathname}?${params}` : pathname;
    router.push(url, { locale: newLocale });
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Cookies.remove("auth_token");
      window.location.href = "/";
    },
    onError: (err) => {
      toast.error((err as Error).message);
    },
  });

  // Get the other language (toggle between en and ar)
  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLanguageName = otherLocale === "en" ? "English" : "العربية";

  return (
    <DropdownMenu dir={isRTL ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button className="size-10 rounded-full hover:!bg-zinc-100" variant={"ghost"}>
          <CgProfile className="size-8 text-[#02A09B]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-0" align={"end"} sideOffset={5}>
        <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/profile/control-panel")}
            className="cursor-pointer font-medium"
          >
            {t("my-profile")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => switchLocale(otherLocale as Locale)}
            className="flex cursor-pointer items-center gap-2 font-medium"
          >
            <Globe className="size-5" />
            {otherLanguageName}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer p-0 text-white">
          <Button
            className="h-auto w-full justify-start bg-red-500 !text-white hover:bg-red-600"
            variant={"transparent"}
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut className="size-5 text-white" />
            {t("log-out")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
