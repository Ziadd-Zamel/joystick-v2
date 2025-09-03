import { useTranslations } from "next-intl";
import { z } from "zod";

const phoneRegex = /^(\+?\d{10,15})$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const useRegisterSchema = () => {
  const t = useTranslations();

  return z
    .object({
      name: z.string().min(1, { message: t("firstname-required") }),
      phone: z
        .string()
        .min(1, { message: t("phone-required") })
        .regex(phoneRegex, { message: t("phone-invalid") }),
      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, { message: t("password-min", { min: 8 }) })
        .regex(strongPasswordRegex, { message: t("password-weak") }),
      rePassword: z.string().min(1, { message: t("repassword-required") }),
      terms: z.boolean().refine((val) => val === true, {
        message: t("terms-required"),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("password-mismatch"),
      path: ["rePassword"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

export const useForgetPasswordSchema = () => {
  const t = useTranslations();

  return z.object({
    phone: z
      .string()
      .min(1, { message: t("phone-required") })
      .regex(phoneRegex, {
        message: t("phone-invalid"),
      }),
  });
};

export type ForgetPasswordFields = z.infer<ReturnType<typeof useForgetPasswordSchema>>;
export const useChangePasswordSchema = () => {
  const t = useTranslations();

  return z
    .object({
      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, { message: t("password-min", { min: 8 }) })
        .regex(strongPasswordRegex, {
          message: t("password-weak"),
        }),

      rePassword: z.string().min(1, { message: t("repassword-required") }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("password-mismatch"),
      path: ["rePassword"],
    });
};
export type ChangePasswordFields = z.infer<ReturnType<typeof useChangePasswordSchema>>;

export const useLoginSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    phone: z.string().min(1, { message: t("phone-required") }),
    password: z.string().min(1, { message: t("password-required") }),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;

export const useProfileSchema = () => {
  const t = useTranslations();

  return z.object({
    fullName: z.string().min(1, { message: t("firstname-required") }),
    emial: z.string().optional(),
    phone: z
      .string()
      .min(1, { message: t("phone-required") })
      .regex(phoneRegex, {
        message: t("phone-invalid"),
      }),
    password: z.string().min(1, { message: t("password-required") }),
  });
};
export type ProfileFields = z.infer<ReturnType<typeof useProfileSchema>>;
