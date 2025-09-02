"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Core Pagination Components
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-2", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("flex items-center justify-center", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "default",
        size,
      }),
      "size-8 text-sm font-normal flex items-center justify-center rounded-full",
      isActive ? "bg-main-yellow text-white" : "text-gray-700",
      disabled ? "bg-gray-200 opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    disabled={disabled}
    className={cn("size-8 border", className)}
    {...props}
  >
    <ChevronLeft className="h-6 w-6" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    disabled={disabled}
    className={cn("size-8 border", className)}
    {...props}
  >
    <ChevronRight className="h-6 w-6" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex size-8 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// Reusable Pagination Component
type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void; // Made optional
  maxVisiblePages?: number;
};

export function PaginationComponent({
  currentPage: initialCurrentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationComponentProps) {
  // Manage internal state if onPageChange is not provided
  const [internalCurrentPage, setInternalCurrentPage] = React.useState(initialCurrentPage);

  // Use internal state if onPageChange is not provided, otherwise use the prop
  const currentPage = onPageChange ? initialCurrentPage : internalCurrentPage;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Function to generate the page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const halfMaxVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfMaxVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show the first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis");
      }
    }

    // Add the range of pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show the last page if we're not at the end
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // Handle page change
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  return (
    <Pagination className="w-full my-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            disabled={!hasPrevious}
            onClick={(e) => {
              e.preventDefault();
              if (hasPrevious) handlePageChange(currentPage - 1);
            }}
            className="bg-transparent hover:bg-transparent genz:bg-transparent genz:hover:bg-transparent text-zinc-700 border-none rtl:rotate-180 "
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page as number);
                }}
                className={cn("border-none text-base font-medium", {
                  "bg-custom-orange genz:bg-gradient": page === currentPage,
                  "bg-transparent genz:bg-transparent": page !== currentPage,
                })}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            disabled={!hasNext}
            onClick={(e) => {
              e.preventDefault();
              if (hasNext) handlePageChange(currentPage + 1);
            }}
            className="bg-transparent hover:bg-transparent genz:bg-transparent genz:hover:bg-transparent text-zinc-700 border-none rtl:rotate-180 "
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
