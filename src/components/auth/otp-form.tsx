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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { OtpFields, useOtpSchema } from "@/lib/schemas/auth.schema";
import { verifyOtpUser } from "@/lib/actions/auth.actions";

export default function OtpForm() {
  const t = useTranslations("auth");
  const otpSchema = useOtpSchema();

  const mutation = useMutation({
    mutationFn: verifyOtpUser,
    onSuccess: () => {
      toast.success(t("otp-verified"));
    },
    onError: () => {
      toast.error(t("otp-failed"));
    },
  });

  const form = useForm<OtpFields>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      phone: "01091732409",
      otp: "",
    },
  });

  const onSubmit: SubmitHandler<OtpFields> = async (values) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-lg flex-col items-center justify-center sm:px-5"
      >
        <h2 className="mb-6 flex w-full justify-center border-b-2 py-3 text-center text-lg font-medium">
          {t("otp-title")}
        </h2>

        <div className="w-full space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lg">{t("otp-label")}</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} onChange={(val) => field.onChange(val)}>
                    <InputOTPGroup className="flex w-full items-center justify-center gap-5">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot
                          className="h-14 w-12 !rounded-sm border-[#DADADA] !bg-[#FFFFFF] !shadow-none"
                          key={i}
                          index={i}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-10 w-full py-4" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? t("verifying") : t("verify-otp")}
        </Button>
      </form>
    </Form>
  );
}
