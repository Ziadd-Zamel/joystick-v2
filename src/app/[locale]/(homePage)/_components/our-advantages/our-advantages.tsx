import { ClientImage } from "@/components/common/client-image";
import { getAdvantages, getAdvantageText } from "@/lib/api/advantages.api";
import { getLocale, getTranslations } from "next-intl/server";

export default async function OurAdvantages() {
  // Translation
  const t = await getTranslations();
  const locale = await getLocale();

  // Data
  const payload = await getAdvantages();
  const advantages = payload.slice(-3);
  const advantageText = await getAdvantageText();

  return (
    <section className="container mx-auto">
      {/* HeadLine */}
      <div className="my-6 flex flex-col items-center justify-center text-center">
        <h1 className="py-4 text-2xl font-bold">
          {locale === "ar" ? advantageText?.title_ar || "عنوان افتراضي" : advantageText?.title}
        </h1>
        <p className="max-w-lg text-lg leading-7 text-[#6D7280]">
          {locale === "ar"
            ? advantageText?.body_ar ||
              "ناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ"
            : advantageText?.body}
        </p>
      </div>

      {advantages.length > 0 ? (
        <div className="my-6 grid grid-cols-1 justify-items-center gap-6 py-6 sm:grid-cols-2 md:grid-cols-3">
          {advantages.map((advantage: Advantage) => (
            <div
              key={advantage.id}
              className="flex flex-col items-center justify-center space-y-4 text-center last:sm:col-span-2 last:md:col-span-1"
            >
              <ClientImage
                alt="Advantage Logo"
                src={advantage.img}
                width={250}
                height={0}
                priority
              />
              <h3 className="py-2 text-2xl font-semibold">
                {advantage?.title[locale] || t("default-title")}
              </h3>
              <p className="text-md max-w-xs text-[#6D7280]">
                {advantage?.description[locale] || t("default-description")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{t("no-features-available")}</p>
      )}
    </section>
  );
}
