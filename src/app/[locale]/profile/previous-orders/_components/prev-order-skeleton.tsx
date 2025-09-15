import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function PrevOrderSkeleton() {
  return (
    <Table className="text-base">
      <TableHeader className="bg-main/5 h-12">
        <TableRow>
          <TableHead className="text-center">
            <Skeleton className="mx-auto h-5 w-28" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="mx-auto h-5 w-24" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="mx-auto h-5 w-20" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="mx-auto h-5 w-28" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium text-zinc-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="text-center">
              <Skeleton className="mx-auto h-4 w-24" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="mx-auto h-4 w-16" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="mx-auto h-4 w-20" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="mx-auto h-4 w-28" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
