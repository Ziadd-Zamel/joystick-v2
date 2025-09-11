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

export default function NewPasswordForm({
  onComplete,
  phoneNumber,
}: {
  onComplete: () => void;
  phoneNumber: string;
}) {
  const t = useTranslations("auth");
  const schema = useNewPasswordSchema();

  const phone = typeof window !== "undefined" ? localStorage.getItem("phone") : "";

  const mutation = useMutation({
    mutationFn: confirmNewPassword,
    onSuccess: () => {
      toast.success(t("password-changed"));
      onComplete();
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col items-center justify-center"
      >
        <h2 className="mb-6 flex w-full justify-center border-b-2 py-3 text-center text-2xl font-medium">
          {t("reset-password")}
        </h2>
        <div className="w-full px-3 pb-4 sm:px-8">
          <p className="mt-5 mb-3 w-full items-start font-medium">
            {t("retrieve-repasword")} <span className="text-xs text-[#02A09B]"> {phoneNumber}</span>
          </p>
          <div className="w-full space-y-6">
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
          </div>
          <Button className="mt-6 w-full py-6" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? <VscLoading className="animate-spin text-lg" /> : t("confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
