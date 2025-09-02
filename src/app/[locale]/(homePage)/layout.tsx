import Navbar from "@/components/layout/header";

export default async function LocaleLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
