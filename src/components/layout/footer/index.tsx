"use client";
import NavLink from "@/components/common/nav-link";
import { Link } from "@/i18n/routing";
import { getStaticInfo } from "@/lib/actions/info.actions";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const navLinks = [
  { url: "/", title: "home" },
  { url: "/store", title: "store" },
  { url: "/about", title: "about" },
  { url: "/videos", title: "videos" },
];

const otherLinks = [
  { href: "/terms", label: "terms" },
  { href: "/privacy-policy", label: "privacy-policy" },
  { href: "/return-policy", label: "return-policy" },
  { href: "/contact", label: "contact" },
];

const Footer = () => {
  // Translations
  const t = useTranslations();
  // Queries
  const { data: contactInfo } = useQuery({
    queryKey: ["contact-info"],
    queryFn: () => getStaticInfo("get-site-data"),
  });

  return (
    <footer className={`from-main relative z-10 mt-10 bg-gradient-to-bl to-[#073433] text-white`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-12 pb-8 2xl:max-w-[80%]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 space-y-6">
            <Link href="/" className="block w-36">
              <Image
                src={"/assets/Images/log.png"}
                alt="Logo"
                className="h-full w-full"
                width={150}
                height={0}
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-200">{t("maintenance-service-text")}</p>
            <div className="flex items-center gap-4">
              {/* Youtube */}
              <Link
                href={contactInfo?.youtube || "https://www.youtube.com/@joystickrepair"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Instagram"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <FaYoutube size={20} />
                </div>
              </Link>

              {/* Instagram */}
              <Link
                href={contactInfo?.instagram || "https://www.instagram.com/joystick.eg/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Instagram"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <FaInstagram size={20} />
                </div>
              </Link>

              {/* Facebook */}
              <Link
                href={contactInfo?.facebook || "https://www.facebook.com/Joystickrepaireg/"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Facebook"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <FaFacebookF size={20} />
                </div>
              </Link>

              {/* Tiktok */}
              <Link
                href={contactInfo?.tiktok || "https://www.tiktok.com/@joystickrepair"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="GitHub"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <FaTiktok size={20} />
                </div>
              </Link>
            </div>
          </div>

          <div className="col-span-1 flex justify-start gap-20 md:justify-center">
            <div className="">
              <h3 className="mb-6 text-start text-lg font-bold">{t("quick-links")}</h3>
              <ul className="space-y-3 text-start">
                {navLinks.map((link) => (
                  <li key={link.title}>
                    <NavLink
                      link={{ title: t(link.title), url: link.url }}
                      className="!transform-none !text-base !font-normal !text-gray-300 !transition-colors hover:!text-white"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-start text-lg font-bold">{t("other-links")}</h3>
              <ul className="space-y-3 text-start">
                {otherLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="!transform-none !text-base !font-normal !text-gray-300 !transition-colors hover:!text-white"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1 flex flex-col lg:items-center">
            <h3 className="mb-6 text-start text-lg font-bold">{t("contact-info")}</h3>
            <ul className="space-y-4">
              <li className="flex flex-row gap-2 text-start text-gray-200">
                <MapPin className="text-primary-foreground/80 h-5 w-5 shrink-0" />
                <span>{contactInfo?.address}</span>
              </li>
              <li className="flex flex-row gap-2 text-start text-gray-200">
                <Phone className="text-primary-foreground/80 h-5 w-5 shrink-0" />
                <span dir="ltr">{contactInfo?.phone_number}</span>
              </li>
              <li className="flex flex-row gap-2 text-start text-gray-200">
                <Mail className="text-primary-foreground/80 h-5 w-5 shrink-0" />
                <span>{contactInfo?.email}</span>
              </li>
              {/* <li className="flex flex-row text-right text-gray-200">
                <Clock className="w-5 h-5 text-primary-foreground/80 ml-3 shrink-0" />
                <span>السبت - الخميس: 9:00 صباحاً - 9:00 مساءً</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 2xl:max-w-[80%]">
          <p className="text-center text-sm text-gray-200">
            {t.rich("copy-right", {
              year: new Date(),
              span: () => (
                <Link
                  href="https://evyx.net/"
                  className="text-white underline transition-colors hover:text-gray-200"
                >
                  evyX LTD
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
