import { getAllBrands } from "@/lib/api/brands.api";
import { getAllTags } from "@/lib/api/tag.api";
import { ReactNode } from "react";
import Filter from "./_components/filter";

interface Props {
  searchParams?: {
    brand_id?: string;
    tags?: string;
    price_from?: string;
    price_to?: string;
    name?: string;
    categoryId?: string;
  };
  children: ReactNode;
}

export default async function ProductsLayout({ children, searchParams }: Props) {
  const tags = await getAllTags();
  const brands = await getAllBrands();

  const initialBrandIds = searchParams?.brand_id
    ? searchParams.brand_id.split(",").map(Number)
    : [];

  const initialTagIds = searchParams?.tags ? searchParams.tags.split(",").map(Number) : [];

  const initialPriceRange = [
    searchParams?.price_from ? parseInt(searchParams.price_from) : 0,
    searchParams?.price_to ? parseInt(searchParams.price_to) : 9999,
  ];

  const initialNameFilter = searchParams?.name || "";

  return (
    <main className="box-container flex flex-col items-start gap-16 lg:flex-row xl:gap-28">
      <Filter
        brands={brands}
        tags={tags}
        initialBrandIds={initialBrandIds}
        initialTagIds={initialTagIds}
        initialPriceRange={initialPriceRange}
        initialNameFilter={initialNameFilter}
      />

      {children}
    </main>
  );
}
