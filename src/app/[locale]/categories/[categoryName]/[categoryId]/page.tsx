import { getFilteredProduct } from "@/lib/actions/product.actions";
import ProductsGrid from "./_components/products-grid";

interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams?: {
    brand_id?: string;
    tags?: string;
    price_from?: string;
    price_to?: string;
    name?: string;
    page?: string;
    limit?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { categoryId } = await params;
  const {
    name,
    brand_id,
    price_from,
    price_to,
    tags,
    page: pageParam,
  } = (await searchParams) ?? {};

  const page = Math.max(1, Number(pageParam) || 1);
  const limit = 9;

  const payload = await getFilteredProduct({
    name: name,
    brand_id: brand_id,
    category_id: categoryId,
    price_from: price_from,
    price_to: price_to,
    tags: tags,
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
