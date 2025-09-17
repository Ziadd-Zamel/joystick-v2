"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getPaginatedCategories } from "@/lib/actions/category.actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CategoriesMenu() {
  // Translation
  const t = useTranslations();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: getPaginatedCategories,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const isLastPage = lastPage.data.meta.current_page >= lastPage.data.meta.last_page;
      return isLastPage ? undefined : lastPage.data.meta.current_page + 1;
    },
  });

  const allCategoires = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-base font-medium rtl:font-bold xl:rtl:text-xl">
            {t("categories")}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            id="scrollTarget"
            className="max-h-[200px] !w-[400px] overflow-y-auto md:left-1/2 md:-translate-x-1/2 rtl:flex-row-reverse"
          >
            {isLoading && (
              <div
                className="grid w-full grid-cols-2 gap-3"
                style={{
                  gridTemplateColumns: "repeat(2, auto)",
                  gridTemplateRows: "repeat(2, auto)",
                }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md"></Skeleton>
                ))}
              </div>
            )}

            <InfiniteScroll
              dataLength={allCategoires.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="mt-3 h-10 w-full rounded-md"></Skeleton>
              ))}
              scrollableTarget="scrollTarget"
            >
              <div
                className="grid w-full grid-cols-2 gap-3"
                style={{
                  gridTemplateColumns: "repeat(2, auto)",
                }}
              >
                {allCategoires.map((category, index) => (
                  <Link
                    key={index}
                    href={`/categories/${category.name}/${category.id}`}
                    className="hover:bg-main rounded-md bg-zinc-100 p-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </InfiniteScroll>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
