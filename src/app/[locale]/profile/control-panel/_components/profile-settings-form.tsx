"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { updateProfile, updateUserPhone } from "@/lib/actions/profile.actions";
import { ProfileSettingFormValues, profileSettingsSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileSettingsForm({ userData }: { userData: User }) {
  const t = useTranslations("profile-route");
  const router = useRouter();

  const form = useForm<ProfileSettingFormValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: userData.username,
      phoneNumber: userData.phone,
    },
  });

  async function onSubmit(values: ProfileSettingFormValues) {
    try {
      if (values.name !== userData.username) {
        const profileData = await updateProfile(values.name);
        toast.success(profileData.message);
      }

      if (values.phoneNumber !== userData.phone) {
        const phoneData = await updateUserPhone(values.phoneNumber);
        toast.success(phoneData.message);
      }
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("profile-settings")}</h2>

      {/* Profile form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 p-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder={t("name")} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone-number")}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md"
                    placeholder={t("phone-number")}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isDirty}
            variant="default"
            type="submit"
            className="self-end"
          >
            {t("save-changes")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
