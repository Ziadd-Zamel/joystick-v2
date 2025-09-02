import Image from "next/image";
import Link from "next/link";

export const navLinks = [
  { url: "/", title: "الرئيسية" },
  { url: "/about", title: "من نحن" },
  { url: "/profile/maintenance", title: "طلب صيانة" },
  { url: "/videos", title: "فيديوهات" },
];

export default function Navbar() {
  return (
    <>
      <header className="p-4 shadow-md shadow-[#EEEEEE80]">
        <div className="box-container flex items-center justify-between">
          <Link href="/" className="hidden w-30 lg:flex">
            <Image
              src={"/assets/icons/logo.svg"}
              alt="Logo"
              width={64}
              height={64}
              className="w-full"
            />
          </Link>{" "}
          <nav className="flex items-center gap-3">
            {navLinks.map((link, index) => {
              return (
                <Link key={index} href={link.url}>
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
