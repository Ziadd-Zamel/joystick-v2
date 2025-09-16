import { getFilteredProduct } from "@/lib/api/product";
import ProductsGrid from "./_components/products-grid";

interface PageProps {
  searchParams?: {
    brand_id?: string;
    tags?: string;
    price_from?: string;
    price_to?: string;
    name?: string;
    categoryId?: string;
    page?: string;
    limit?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = 9;

  const payload = await getFilteredProduct({
    name: searchParams?.name,
    brand_id: searchParams?.brand_id,
    category_id: searchParams?.categoryId,
    price_from: searchParams?.price_from,
    price_to: searchParams?.price_to,
    tags: searchParams?.tags,
    page: page,
    limit: limit,
  });
  return (
    <ProductsGrid
      pagination={{
        currentPage: page,
        totalPages: Math.max(1, payload?.meta?.last_page || 10),
        limit,
      }}
      products={payload.data}
    />
  );
}
