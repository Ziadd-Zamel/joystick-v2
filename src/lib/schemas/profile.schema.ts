import z from "zod";

export const profileSettingsSchema = z.object({
  name: z.string().min(1).optional(),
  phoneNumber: z.string().min(1).optional(),
});

export type ProfileSettingFormValues = z.infer<typeof profileSettingsSchema>;

export const profileEmailSchema = z.object({
  email: z.string().min(1).optional(),
});

export type ProfileEmailFormValues = z.infer<typeof profileEmailSchema>;

export const profilePasswordSchema = z.object({
  oldPassword: z.string().min(1).optional(),
  newPassword: z.string().min(1).optional(),
  confirmNewPassword: z.string().min(1).optional(),
});

export type ProfilePasswordFormValues = z.infer<typeof profilePasswordSchema>;
