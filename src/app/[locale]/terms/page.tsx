import { getLocale } from "next-intl/server";

const getTerms = async () => {
  const locale = await getLocale();
  try {
    const res = await fetch(`${process.env.API}terms`, {
      headers: {
        lang: locale,
      },
    });

    if (!res.ok) {
      const payload = await res.json();
      throw new Error(payload.message || "فشل في جلب البيانات من الخادم");
    }

    const payload = await res.json();

    return payload;
  } catch (err) {
    throw err;
  }
};

export default async function Page() {
  const terms = await getTerms();

  return (
    <section className="container mx-auto p-5">
      <h1 className="mb-5 text-2xl font-medium">Terms & Conditions Page</h1>
      <p>{terms.data}</p>
    </section>
  );
}
