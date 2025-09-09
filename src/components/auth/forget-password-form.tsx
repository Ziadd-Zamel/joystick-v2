"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ForgotPasswordFields, useForgotPasswordSchema } from "@/lib/schemas/auth.schema";
import { forgotPasswordUser } from "@/lib/actions/auth.actions";

export default function ForgotPasswordForm() {
  // Schema
  const forgotPasswordSchema = useForgotPasswordSchema();

  // Translations
  const t = useTranslations("auth");

  // Mutation
  const mutation = useMutation({
    mutationFn: forgotPasswordUser,
    onSuccess: () => {
      toast.success(t("otp-sent"), {
        description: t("check-phone"),
      });
    },
    onError: () => {
      toast.error(t("otp-failed"));
    },
  });

  // Form
  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFields> = async (values) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col items-center justify-center sm:px-5"
      >
        <h2 className="mb-6 flex w-full justify-center border-b-2 py-3 text-center text-lg font-medium">
          {t("forgot-password-title")}
        </h2>

        <div className="w-full space-y-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    className="border-[#F0EEF0]"
                    variant="outline"
                    placeholder={t("phone-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-10 w-full py-4" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? t("sending") : t("send-otp")}
        </Button>
      </form>
    </Form>
  );
}
