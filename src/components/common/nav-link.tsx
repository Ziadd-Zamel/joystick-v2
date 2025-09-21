"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

const NavLink = ({
  link,
  className,
}: {
  link: { title: string; url: string };
  className: string;
}) => {
  const pathName = usePathname();
  return (
    <Link
      href={link.url}
      className={`hover:text-primary xl:text-md text-md inline-flex cursor-pointer items-center px-2 text-center font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-1 hover:scale-110 2xl:text-lg ${
        pathName === link.url ? "text-primary" : ""
      } ${className}`}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
