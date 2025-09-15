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

export const userAddressSchema = (t: TZodIntel) =>
  z.object({
    buildingNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("building-number-error"),
    }),

    apartmentNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("apartment-number-error"),
    }),

    floorNumber: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: t("floor-number-error"),
    }),

    addressType: z.enum(["Home", "Work"]),

    latitude: z
      .number(t("latitude-number-error"))
      .min(-90, t("latitude-min-error"))
      .max(90, t("latitude-max-error")),

    longitude: z
      .number(t("longitude-number-error"))
      .min(-180, t("longitude-min-error"))
      .max(180, t("longitude-max-error")),

    address: z.string(t("address-required-error")).min(5, t("address-min-error")),
  });
export type UserAddressFormValues = z.infer<ReturnType<typeof userAddressSchema>>;

// Devices
export const addDeviceFormSchema = (t: TZodIntel) =>
  z.object({
    deviceName: z
      .string()
      .min(1, t("device-name-required"))
      .min(2, t("device-name-min"))
      .max(100, t("device-name-max"))
      .trim(),
    serialNumber: z
      .string()
      .min(1, t("serial-number-required"))
      .min(3, t("serial-number-min"))
      .max(50, t("serial-number-max")),
    deviceStatus: z.enum(["new", "old", "used"]),
    purchaseDate: z.date(t("purchase-date-required")),
  });
export type AddDeviceFormValues = z.infer<ReturnType<typeof addDeviceFormSchema>>;

export const repairRequestSchema = (t: TZodIntel) =>
  z.object({
    deviceId: z.any(),
    addressId: z.string().min(1, "Address is Required"),
    availableDay: z.date("Day is required"),
    availableDayId: z.string().min(1, "Day is Required"),
    availableTimeId: z.string().min(1, "Time is Required"),
    extraNotes: z.string().max(500, "Notes can't be more than 500 chars").optional(),
    problemsParts: z
      .array(z.number(), "Problem parts is required")
      .min(1, "At least one part is required"),
  });
export type RepairRequeseFormValues = z.infer<ReturnType<typeof repairRequestSchema>>;
