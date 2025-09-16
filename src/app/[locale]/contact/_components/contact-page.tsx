import Image from "next/image";
import ContactForm from "./contact-form";
import { getStaticInfo } from "@/lib/api/inf.api";
import { getTranslations } from "next-intl/server";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import Link from "next/link";

export default async function ContactPage() {
  const t = await getTranslations("contact-route");
  const data = await getStaticInfo("get-site-data");

  return (
    <div>
      <div className="flex-center relative h-[35vh] w-full bg-[#029C9726]">
        <Image
          src={"/assets/Images/contactus.png"}
          alt="Contact us background"
          fill
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[#029C9726]" />
        <h1 className="relative z-10 text-3xl font-semibold">{t("contact-us")}</h1>
      </div>

      <div className="box-container w-full py-20">
        <ContactForm />

        <div className="mt-16 flex w-full flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-around">
          <div className="mt-20 text-center sm:mt-0">
            <h4 className="mb-4 text-2xl font-semibold">{t("visit-us")}</h4>
            <p className="text-lg font-semibold">{data.address}</p>
          </div>

          <div className="mt-20 text-center sm:mt-0">
            <h4 className="mb-4 text-2xl font-semibold">{t("contact-info")}</h4>

            {/* Phone and Email */}
            <div className="mb-6 flex gap-5 space-y-3">
              <Link
                href={`tel:${data.phone_number}`}
                className="text-lg font-semibold transition-colors hover:text-[#029C97]"
                dir="ltr"
              >
                {data.phone_number}
              </Link>

              <Link
                href={`mailto:${data.email}`}
                className="text-lg font-semibold transition-colors hover:text-[#029C97]"
              >
                {data.email}
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-4">
              {data.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-[#029C97] hover:text-white"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
              )}

              {data.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-[#029C97] hover:text-white"
                >
                  <BsInstagram className="h-6 w-6" />
                </a>
              )}

              {data.youtube && (
                <a
                  href={data.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-[#029C97] hover:text-white"
                >
                  <BsYoutube className="h-6 w-6" />
                </a>
              )}

              {data.tiktok && (
                <a
                  href={data.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-[#029C97] hover:text-white"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
