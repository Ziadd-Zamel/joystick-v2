"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { VscLoading } from "react-icons/vsc";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { NewPasswordFields, useNewPasswordSchema } from "@/lib/schemas/auth.schema";
import { confirmNewPassword } from "@/lib/actions/auth.actions";
import { PasswordInput } from "./password-input";

export default function NewPasswordForm() {
  const t = useTranslations("auth");
  const schema = useNewPasswordSchema();

  const phone = typeof window !== "undefined" ? localStorage.getItem("phone") : "";

  const mutation = useMutation({
    mutationFn: confirmNewPassword,
    onSuccess: () => {
      toast.success(t("password-changed"));
      localStorage.removeItem("phone");
    },
    onError: () => {
      toast.error(t("password-change-failed"));
    },
  });

  const form = useForm<NewPasswordFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      password_confirmation: "",
      phone: phone || "",
    },
  });

  const onSubmit: SubmitHandler<NewPasswordFields> = (values) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] md:min-w-[380px]">
        <h2 className="mb-4 flex justify-center border-b-2 py-3 text-center text-lg font-medium">
          {t("reset-password")}
        </h2>

        <div className="space-y-4 p-5">
          <h2 className="text-md text-center font-medium">{t("reset-password-instructions")}</h2>

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t("enter-password")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Confirmation */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-password")}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t("re-enter-password")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="flex w-full items-center justify-center py-3"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <VscLoading className="animate-spin text-lg" /> : t("confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
