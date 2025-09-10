"use client";

import { House } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function ProfileBreadCrumbs() {
  // Hooks
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("profile-route");

  // Helpers
  const isDynamicSegment = (segment: string) =>
    /^[0-9]+$/.test(segment) || /^[a-f0-9]{24}$/i.test(segment);

  // Get the segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  // Build the breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const labelKey = decodeURIComponent(segment);
    return { labelKey, href };
  });

  return (
    <div className="box-container mx-auto my-8">
      <div className="w-fit rounded-full bg-[#EAFEF1] p-4">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home */}
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-muted-foreground hover:text-foreground no-underline"
              >
                <Link href="/">
                  <House className="text-brand size-5" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isDynamic = isDynamicSegment(crumb.labelKey);

              return (
                <div key={crumb.href} className="flex items-center">
                  <BreadcrumbSeparator
                    className={cn(locale === "ar" ? "rotate-180" : "rotate-0")}
                  />
                  <BreadcrumbItem className="ps-2">
                    {isLast ? (
                      <BreadcrumbPage className="text-foreground font-['Tajawal,sans-serif']">
                        {isDynamic ? crumb.labelKey : t(crumb.labelKey)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        asChild
                        className="text-muted-foreground hover:text-foreground font-['Tajawal,sans-serif'] no-underline"
                      >
                        <p>{isDynamic ? crumb.labelKey : t(crumb.labelKey)}</p>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
