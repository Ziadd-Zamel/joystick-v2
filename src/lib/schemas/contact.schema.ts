// lib/schemas/contact.schema.ts
import { z } from "zod";
import { useTranslations } from "next-intl";

export const useContactSchema = () => {
  const t = useTranslations("contact");

  return z.object({
    name: z.string().min(1, { message: t("name-required") }),
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
    phone: z.string().min(1, { message: t("phone-required") }),
    message: z
      .string()
      .min(1, { message: t("message-required") })
      .min(10, { message: t("message-min-length") }),
  });
};

export type ContactFields = z.infer<ReturnType<typeof useContactSchema>>;
