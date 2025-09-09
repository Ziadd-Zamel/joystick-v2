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
import { useLocale, useTranslations } from "next-intl";
import { PasswordInput } from "./password-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser } from "@/lib/actions/auth.actions";
import { useClientCookies } from "@/lib/utils/auth-cookies";
import ForgotPasswordDialog from "./forget-password-flow";

export default function LoginForm() {
  // Hooks
  const { login } = useClientCookies();
  const loginSchema = useLoginSchema();
  const locale = useLocale();
  // Translations
  const t = useTranslations("auth");

  // Mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful!", {
        description: "Welcome back!",
      });

      // Save user data to cookies
      login(data.data);
    },
    onError: () => {
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    },
  });

  // Form
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Submit Function
  const onSubmit: SubmitHandler<LoginFields> = async (values) => {
    console.log(values);
    loginMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col items-center justify-center sm:px-5"
      >
        <div className="mt-8 w-full space-y-8">
          {/**Phone Number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("phone")}</FormLabel>
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

          {/**Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("password-label")}</FormLabel>
                <FormControl>
                  <PasswordInput variant={"outline"} placeholder={"******"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/**Action */}
        <div className="mt-3 flex w-full justify-end">
          <ForgotPasswordDialog />
        </div>
        <Button className="mt-10 w-full py-7" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? t("logging-in") : t("login")}
        </Button>
      </form>
    </Form>
  );
}
