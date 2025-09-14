import z from "zod";

export const profileSettingsSchema = (t: TZodIntel) =>
  z.object({
    name: z.string().min(1, t("name-required")),
    phoneNumber: z
      .string()
      .min(1, t("phone-required"))
      .regex(/^01/, t("phone-start"))
      .regex(/^01[0125]/, t("phone-third-digit"))
      .regex(/^01[0125][0-9]{8}$/, t("phone-length")),
  });
export type ProfileSettingFormValues = z.infer<ReturnType<typeof profileSettingsSchema>>;

export const profileEmailSchema = (t: TZodIntel) =>
  z.object({
    email: z.string().email(t("email-required")).toLowerCase().trim(),
  });
export type ProfileEmailFormValues = z.infer<ReturnType<typeof profileEmailSchema>>;

export const profilePasswordSchema = (t: TZodIntel) =>
  z
    .object({
      oldPassword: z.string().min(1, t("old-password-required")),
      newPassword: z.string().min(8, t("password-min-length")),
      confirmNewPassword: z.string().min(8, t("password-min-length")),
    })
    .refine((values) => values.newPassword === values.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: t("passwords-dont-match"),
    });
export type ProfilePasswordFormValues = z.infer<ReturnType<typeof profilePasswordSchema>>;
