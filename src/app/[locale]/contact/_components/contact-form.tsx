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
import { Textarea } from "@/components/ui/textarea";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContactFields, useContactSchema } from "@/lib/schemas/contact.schema";
import { submitContactForm } from "@/lib/actions/contact.actions";

export default function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  // Hooks
  const contactSchema = useContactSchema();
  const locale = useLocale();

  // Translations
  const t = useTranslations("contact-route");

  // Mutation
  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success(t("success-title"), {
        description: t("success-description"),
      });

      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(t("error-title"), {
        description: error?.message || t("error-description"),
      });
    },
  });

  // Form
  const form = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Submit Function
  const onSubmit: SubmitHandler<ContactFields> = async (values) => {
    console.log(values);
    contactMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:px-5"
      >
        <div className="mt-8 flex w-full flex-col items-start gap-10 sm:flex-row md:gap-20">
          <div className="w-full space-y-6 sm:w-1/2">
            {/**Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#F0EEF0]"
                      variant={"outline"}
                      placeholder={t("name-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/**Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#F0EEF0]"
                      variant={"outline"}
                      type="email"
                      placeholder={t("email-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/**Phone */}
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
          </div>
          <div className="flex w-full flex-col items-end sm:w-1/2">
            {/**Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[180px] resize-none border-[#F0EEF0]"
                      placeholder={t("message-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/**Submit Button */}
            <Button
              className="mt-10 w-fit px-12 py-5"
              type="submit"
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? t("sending") : t("send")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
