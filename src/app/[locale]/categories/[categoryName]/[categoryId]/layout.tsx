import { getAllTags } from "@/lib/actions/tags.actions";
import Filter from "./_components/filter";
import { getAllBrands } from "@/lib/actions/brands.actions";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const tags = await getAllTags();
  const brands = await getAllBrands();

  return (
    <main className="box-container mt-5 flex flex-col items-start gap-5 lg:flex-row xl:gap-5">
      <Filter brands={brands} tags={tags} />

      {children}
    </main>
  );
}
