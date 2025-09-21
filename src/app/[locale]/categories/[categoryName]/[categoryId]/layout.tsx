import { getAllTags } from "@/lib/actions/tags.actions";
import { ReactNode } from "react";
import Filter from "./_components/filter";
import { getAllBrands } from "@/lib/actions/brands.actions";

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
    searchParams?.price_to ? parseInt(searchParams.price_to) : 99999,
  ];

  const initialNameFilter = searchParams?.name || "";

  return (
    <main className="box-container mt-5 flex flex-col items-start gap-5 lg:flex-row xl:gap-5">
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
