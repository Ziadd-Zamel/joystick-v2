import Image from "next/image";
import Link from "next/link";
import LoginButton from "./_components/login-button";
import NavLinks from "./_components/nav-links";
import { getAllCategories } from "@/lib/api/categories.api";
import Sidebar from "./_components/sidebar";
import ShoppingCartButton from "./_components/shoping-cart-button";

export default async function Navbar() {
  // get all categories
  const categories = await getAllCategories();
  return (
    <>
      <header className="p-4 shadow-md shadow-[#EEEEEE80]">
        <div className="box-container flex items-center justify-between">
          {/** mobile sidebar */}
          <Sidebar categories={categories} />

          {/**Main Logo */}
          <Link href="/" className="relative hidden h-12 w-40 lg:flex">
            <Image src={"/assets/icons/logo.svg"} alt="Logo" fill className="w-full" />
          </Link>

          {/**Main nav links (desktop only) */}
          <NavLinks categories={categories} />

          {/**Buttons*/}
          <div className="flex items-center gap-2">
            <ShoppingCartButton />
            <LoginButton />
          </div>
        </div>
      </header>
    </>
  );
}
