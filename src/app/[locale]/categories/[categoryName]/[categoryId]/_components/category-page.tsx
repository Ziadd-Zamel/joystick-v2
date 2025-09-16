import ProductsGrid from "./products-grid";

interface CategoryPageProps {
  searchParams?: {
    brand_id?: string;
    tags?: string;
    price_from?: string;
    price_to?: string;
    name?: string;
    categoryId?: string;
  };
}

export default async function CategoryPage({ searchParams }: CategoryPageProps) {
  return <ProductsGrid searchParams={searchParams} />;
}
