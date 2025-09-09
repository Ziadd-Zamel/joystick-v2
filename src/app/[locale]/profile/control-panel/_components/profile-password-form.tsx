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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";

const profilePasswordSchema = z.object({
  oldPassword: z.string().min(1).optional(),
  newPassword: z.string().min(1).optional(),
  confirmNewPassword: z.string().min(1).optional(),
});

type ProfilePasswordFormValues = z.infer<typeof profilePasswordSchema>;

export default function ProfilePasswordForm() {
  const t = useTranslations("profile-route");

  const form = useForm<ProfilePasswordFormValues>({
    resolver: zodResolver(profilePasswordSchema),
  });

  function onSubmit(values: ProfilePasswordFormValues) {
    console.log(values);
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
