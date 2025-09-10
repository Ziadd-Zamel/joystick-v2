import { useTranslations } from "next-intl";
import { z } from "zod";

const phoneRegex = /^(\+?\d{10,15})$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const useForgotPasswordSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    phone: z
      .string()
      .min(1, { message: t("phone-required") })
      .regex(phoneRegex, {
        message: t("phone-invalid"),
      }),
  });
};

export type ForgotPasswordFields = z.infer<ReturnType<typeof useForgotPasswordSchema>>;

export const useChangePasswordSchema = () => {
  const t = useTranslations("auth");

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
  const t = useTranslations("auth");

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
export const useRegisterSchema = () => {
  const t = useTranslations("auth");

  return z
    .object({
      name: z.string().min(1, { message: t("name-required") }),
      phone: z.string().min(1, { message: t("phone-required") }),
      password: z.string().min(6, { message: t("password-min-length") }),
      confirmPassword: z.string().min(1, { message: t("confirm-password-required") }),
      building_number: z.string().min(1, { message: t("building-number-required") }),
      floor_number: z.string().min(1, { message: t("floor-number-required") }),
      apartment_number: z.string().min(1, { message: t("apartment-number-required") }),
      address: z.string().min(1, { message: t("address-required") }),
      governorate: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwords-dont-match"),
      path: ["confirmPassword"],
    });
};

export type RegisterFields = z.infer<ReturnType<typeof useRegisterSchema>>;

export type OtpFields = {
  phone: string;
  otp: string;
};

export const useOtpSchema = () => {
  const t = useTranslations("auth");

  return z.object({
    phone: z.string().min(1, { message: t("phone-required") }),
    otp: z
      .string()
      .length(6, { message: t("otp-length") })
      .regex(/^\d+$/, { message: t("otp-numbers-only") }),
  });
};

export const useNewPasswordSchema = () => {
  const t = useTranslations("auth");

  return z
    .object({
      phone: z.string().min(1),
      password: z.string().min(6, { message: t("password-min") }),
      password_confirmation: z.string().min(1, { message: t("confirm-password-required") }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("passwords-not-match"),
      path: ["password_confirmation"],
    });
};

export type NewPasswordFields = z.infer<ReturnType<typeof useNewPasswordSchema>>;
