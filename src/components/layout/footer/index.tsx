"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const navigationLinks = [
    { href: "/", label: t("home") },
    { href: "/restaurants", label: t("restaurants") },
    { href: "/coffee-shops", label: t("coffeeShops") },
    { href: "/favourite", label: t("favourite") },
  ];

  const legalLinks = [
    { href: "/terms", label: t("terms") },
    { href: "/privacy", label: t("privacy") },
    { href: "/cookies", label: t("cookies") },
  ];

  const socialLinks = [
    { href: "https://instagram.com", icon: "/assets/icons/Instagram.svg", label: t("instagram") },
    { href: "https://facebook.com", icon: "/assets/icons/Facebook.svg", label: t("facebook") },
    { href: "https://youtube.com", icon: "/assets/icons/Youtube.svg", label: t("youtube") },
  ];
  if (pathname.includes("/dine-in") || /^\/restaurants\/[^\/]+\/[^\/]+$/.test(pathname)) {
    return null;
  }
  return (
    <footer className="bg-main genz:footer-bg overflow-x-hidden">
      <div className="box-container">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12 py-6 md:py-10 lg:py-16 border-b border-b-white genz:border-b-white">
          {/* Brand Section - Left Side */}
          <div className="lg:max-w-sm">
            <div className="mb-4">
              <Image
                src={"/assets/Images/white-logo.svg"}
                alt="logo"
                width={150}
                height={0}
                className="mb-4"
              />
              <p className="text-teal-100 genz:text-zinc-800 leading-relaxed">
                {t("brandDescription")}
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 hover:bg-teal-400 genz:bg-gradient rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Image src={social.icon} alt={social.label} width={40} height={0} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Sections */}
          <div className="flex flex-col sm:flex-row justify-between gap-12 lg:gap-16 xl:gap-24 lg:mt-0">
            {/* Links Section */}
            <div>
              <h3 className="text-lg font-semibold text-white genz:text-zinc-800 mb-4 uppercase tracking-wider">
                {t("linksTitle")}
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-teal-100 genz:text-zinc-800 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold text-white genz:text-zinc-800 mb-4 uppercase tracking-wider">
                {t("legalTitle")}
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-teal-100 genz:text-zinc-800 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold text-white genz:text-zinc-800 mb-4 uppercase tracking-wider">
                {t("contactTitle")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 genz:bg-transparent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-main genz:text-purple-500" />
                  </div>
                  <span className="text-teal-100 genz:text-zinc-800">19025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 genz:bg-transparent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-main genz:text-purple-500" />
                  </div>
                  <Link
                    href="mailto:Orderly@gmail.com"
                    className="text-teal-100 genz:text-zinc-800 hover:text-white transition-colors duration-200"
                  >
                    Orderly@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-main genz:border-zinc-100">
          <div className="flex-center w-full py-5 ">
            <p className="text-center text-white genz:text-zinc-800">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
