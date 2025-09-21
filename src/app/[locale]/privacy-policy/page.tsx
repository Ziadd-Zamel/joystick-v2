import { getLocale } from "next-intl/server";

const getPrivacyPolicy = async () => {
  const locale = await getLocale();
  try {
    const res = await fetch(`${process.env.API}privacy`, {
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
  const privacyPolicy = await getPrivacyPolicy();

  return (
    <section className="container mx-auto p-5">
      <h1 className="mb-5 text-2xl font-medium">Privacy Policy Page</h1>
      <p>{privacyPolicy.data}</p>
    </section>
  );
}
