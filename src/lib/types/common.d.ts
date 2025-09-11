import { useTranslations } from "next-intl";

declare global {
  type SearchParams = { [key: string]: string | string[] | undefined };

  type RouteProps = {
    params: Promise<{ locale: Locale; productSlug: string }>;
    searchParams: SearchParams;
  };

  type LayoutProps = {
    children: React.ReactNode;
  } & Pick<RouteProps, "params">;

  type User = {
    id: number;
    username: string;
    email: string | null;
    email_verified: number;
    phone: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    token: string;
    status: string;
    addresses: Address[];
    fcm_token: string | null;
    governorate: string | null;
    city: string | null;
  };

  type TZodIntel = ReturnType<typeof useTranslations>;
}

export {};
