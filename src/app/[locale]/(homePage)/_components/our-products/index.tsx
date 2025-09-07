import HeadLine from "@/components/common/headline";
import { getLocaleAssets } from "@/lib/utils/index";
import OurProductsContent from "./our-products-content";

export default async function OurProductsSection() {
  // Translation
  const { t } = await getLocaleAssets();

  return (
    <section className="box-container my-16">
      {/* Section Heading */}
      <HeadLine title={t("our-products")} className="mb-5" />
      <OurProductsContent />
    </section>
  );
}
