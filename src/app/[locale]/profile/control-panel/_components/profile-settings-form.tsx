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
import { ProfileSettingFormValues, profileSettingsSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export default function ProfileSettingsForm({ userData }: { userData: User }) {
  const t = useTranslations("profile-route");

  const form = useForm<ProfileSettingFormValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: userData.username,
      phoneNumber: userData.phone,
    },
  });

  function onSubmit(values: ProfileSettingFormValues) {
    console.log(values);
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

          <Button variant="default" type="submit" className="self-end">
            {t("save-changes")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
