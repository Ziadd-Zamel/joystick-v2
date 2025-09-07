import HeadLine from "@/components/common/headline";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getAllReviews } from "@/lib/api/reviews.api";
import { getLocaleAssets } from "@/lib/utils/index";

export default async function Testimonials() {
  // Translations
  const { t, direction } = await getLocaleAssets();
  const reviews = await getAllReviews();

  return (
    <section className="box-container my-16">
      <HeadLine title={t("customers-reviews")} description={t("lorem")} />

      <Carousel opts={{ align: "start", direction }} className="w-full select-none">
        <CarouselContent className="mr-2 -ml-1 gap-10 px-4">
          {reviews.map((rev: Review) => (
            <CarouselItem key={rev.id} className="gap- basis-full py-6">
              <div className="relative z-10 mx-auto w-full max-w-2xl cursor-pointer bg-white shadow-md before:absolute before:inset-0 before:-z-10 before:scale-[1.05] before:rounded-2xl before:bg-white before:shadow-md after:absolute after:inset-0 after:-z-20 after:scale-[1.1] after:rounded-2xl after:bg-white after:shadow-md">
                {/* Review Content */}
                <div className="mt-8 flex min-h-56 w-full flex-col items-center justify-center px-4 pb-4 text-black">
                  <p className="text-md p-4 text-zinc-800 md:text-lg">{rev.content}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
