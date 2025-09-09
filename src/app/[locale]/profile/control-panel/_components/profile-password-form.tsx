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
import { updateUserPassword } from "@/lib/actions/profile.actions";
import { ProfilePasswordFormValues, profilePasswordSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export default function ProfilePasswordForm() {
  const t = useTranslations("profile-route");

  const form = useForm<ProfilePasswordFormValues>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: ProfilePasswordFormValues) {
    try {
      const data = await updateUserPassword(values);
      console.log("password data", data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("change-password")}</h2>

      {/* Profile form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 p-5">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("old-password")}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md"
                    placeholder={t("old-password")}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("new-password")}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md"
                    placeholder={t("new-password")}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-new-password")}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-md"
                    placeholder={t("confirm-new-password")}
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
