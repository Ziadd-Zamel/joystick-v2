"use client";
import * as React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SegmentMapping {
  [key: string]: string;
}

interface BreadcrumbProps {
  maxWords?: number;
  className?: string;
}

const segmentMapping: SegmentMapping = {
  profile: "الملف الشخصي",
  "control-panel": "لوحة التحكم",
  "added-location": "العناوين المضافة",
  "previous-requests": "الطلبات السابقة",
  "contuct-us": "تواصل معنا",
  favourite: "المفضلة",
  maintenance: "صيانة",
  "help-center": "مركز المساعدة",
  store: "المتجر",
  devices: "الأجهزه",
  "shopping-cart": "عربة التسوق",
  "confirm-request": "تأكيد الطلب",
  "added-devices": " اضافة أجهزة",
  "repair-request": "طلب صيانة",
};

const shouldSkipSegment = (segment: string): boolean => {
  return segment === "profile" || segment === "store";
};

const limitWords = (text: string, maxWords = 4): string => {
  return text.split(" ").slice(0, maxWords).join(" ");
};

export default function ProfileBreadCrumbs({ maxWords = 4, className = "" }: BreadcrumbProps) {
  const pathname = usePathname();
  const pathSegments: string[] = pathname.split("/").filter(Boolean);

  const breadcrumbItems: (React.ReactElement | null)[] = pathSegments.map(
    (segment: string, index: number) => {
      if (!isNaN(Number(segment))) return null;

      const decodedSegment: string = decodeURIComponent(segment);

      if (shouldSkipSegment(decodedSegment)) return null;

      const translatedSegment: string = segmentMapping[decodedSegment] || decodedSegment;
      const limitedWords: string = limitWords(translatedSegment, maxWords);
      const href: string = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast: boolean = index === pathSegments.length - 1;

      return isLast ? (
        <BreadcrumbItem key={index}>
          <BreadcrumbPage className="text-foreground font-['Tajawal,sans-serif']">
            {limitedWords}
          </BreadcrumbPage>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink
            href={href}
            className="text-muted-foreground hover:text-foreground font-['Tajawal,sans-serif'] no-underline"
          >
            {limitedWords}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    },
  );

  const filteredBreadcrumbItems: React.ReactElement[] = breadcrumbItems.filter(
    (breadcrumb): breadcrumb is React.ReactElement => breadcrumb !== null,
  );

  return (
    <div className={`mx-auto my-8 w-[82%] p-2 md:p-3 ${className}`}>
      <div className="w-fit rounded-[30px] bg-[#EAFEF1] p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-muted-foreground hover:text-foreground font-['Tajawal,sans-serif'] no-underline"
              >
                الرئيسية
              </BreadcrumbLink>
            </BreadcrumbItem>

            {filteredBreadcrumbItems.length > 0 && (
              <>
                <BreadcrumbSeparator>
                  <GrFormPrevious />
                </BreadcrumbSeparator>
                {filteredBreadcrumbItems.map((item: React.ReactElement, index: number) => (
                  <React.Fragment key={index}>
                    {item}
                    {index < filteredBreadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator>
                        <GrFormPrevious />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
