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
import { LoginFields, useLoginSchema } from "@/lib/schemas/auth.schema";
import { useTranslations } from "next-intl";
import { PasswordInput } from "./password-input";

export default function LoginForm() {
  // Hooks
  const loginSchema = useLoginSchema();
  const t = useTranslations("auth");

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<LoginFields> = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col items-center justify-center sm:px-5"
      >
        <div className="mt-16 w-full space-y-8">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    className="border-[#F0EEF0]"
                    variant={"outline"}
                    placeholder={t("phone-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">{t("password-label")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    variant={"outline"}
                    placeholder={t("password-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-3 flex w-full justify-end">
          <p className="text-main text-end text-lg font-semibold">{t("forget-password")}</p>
        </div>
        <Button className="mt-10 w-full py-4" type="submit">
          {t("login")}
        </Button>
      </form>
    </Form>
  );
}
