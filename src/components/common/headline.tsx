import { cn } from "@/lib/utils";
import React from "react";

export default function HeadLine({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className={cn("py-4 text-center text-2xl font-bold", className)}>{title}</h1>
      <p className="text-medium text-center text-zinc-500">{description && description}</p>
    </div>
  );
}
