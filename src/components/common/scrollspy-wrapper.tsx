"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollspy } from "@/components/ui/scrollspy";
import { useRef } from "react";

export default function ScrollspyWrapper({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: React.ReactNode;
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-5">
      <div className="border-main flex w-full gap-2 border-b pb-5">
        <Scrollspy
          offset={25}
          targetRef={parentRef}
          smooth={false}
          className="flex flex-wrap gap-2.5"
        >
          {header}
        </Scrollspy>
      </div>
      <div className="w-full">
        <ScrollArea className="-me-5 h-screen grow p-5 pe-10 pt-0" viewportRef={parentRef}>
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
