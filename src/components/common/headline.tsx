import { cn } from "@/lib/utils";
import React from "react";

export default function HeadLine({ className, title }: { className?: string; title: string }) {
  return <h1 className={cn("py-4 text-center text-2xl font-bold", className)}>{title}</h1>;
}
