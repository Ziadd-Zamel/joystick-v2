import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import NavLinks from "./_components/nav-links";
import Sidebar from "./_components/sidebar";
import ShoppingCartButton from "./_components/shoping-cart-button";
import AuthDialog from "./_components/auth-dialog";
import { UserDropdown } from "./_components/user-menu";
import NotificationDropdown from "./_components/notification-dropdown";

import { getAllCategories } from "@/lib/api/categories.api";
import { isUserLoggedin } from "@/lib/utils/server-cookies";
import { CgProfile } from "react-icons/cg";
import { ShoppingCart } from "lucide-react";

export default async function Navbar() {
  // Fetch all categories
  const categories = await getAllCategories();

  // Check if user is authenticated
  const isLogedIn = await isUserLoggedin();

  return (
    <>
      <header className="p-4 shadow-md shadow-[#EEEEEE80]">
        <div className="box-container flex items-center justify-between">
          {/* Mobile sidebar - only visible on mobile devices */}
          <Sidebar categories={categories} />

          {/* Main Logo - hidden on mobile, visible on desktop */}
          <Link href="/" className="relative hidden h-12 w-40 lg:flex">
            <Image src={"/assets/icons/logo.svg"} alt="Logo" fill className="w-full" />
          </Link>

          {/* Main navigation links - desktop only */}
          <NavLinks categories={categories} />

          {/* Action buttons section */}
          <div className="flex items-center gap-4">
            {/* User profile dropdown - only shown when logged in*/}
            {isLogedIn && (
              <Suspense
                fallback={
                  <>
                    <CgProfile className="text-3xl text-[#02A09B]" />
                  </>
                }
              >
                <UserDropdown />
              </Suspense>
            )}

            {/* Shopping cart button - only shown when logged in */}
            {isLogedIn && (
              <Suspense
                fallback={
                  <>
                    <ShoppingCart className="size-7" strokeWidth={1.3} />
                  </>
                }
              >
                <ShoppingCartButton />
              </Suspense>
            )}

            {/* Notifications dropdown - only shown when logged in */}
            {isLogedIn && <NotificationDropdown />}

            {/* Authentication dialog - only shown when not logged in */}
            {!isLogedIn && <AuthDialog />}
          </div>
        </div>
      </header>
    </>
  );
}
