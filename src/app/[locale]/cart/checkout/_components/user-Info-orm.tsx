"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useLocale, useTranslations } from "next-intl";

// Schema
const userInfoSchema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "الاسم الثاني مطلوب"),
  title: z.string().min(1, "العنوان مطلوب"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
});

type UserInfoFields = z.infer<typeof userInfoSchema>;

export default function UserInfoForm() {
  // Hooks
  const locale = useLocale();
  const t = useTranslations("cart");
  // Form
  const form = useForm<UserInfoFields>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      phone: "",
    },
  });

  // Submit Function
  const onSubmit: SubmitHandler<UserInfoFields> = async (values) => {
    console.log(values);
    // Handle form submission here
  };

  return (
    <Form {...form}>
      <form
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center sm:px-5"
      >
        <div className="mt-8 w-full space-y-8">
          {/* First Row - First Name and Last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/**First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("first-name")}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#F0EEF0]"
                      placeholder={t("first-name-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/**Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("last-name")}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#F0EEF0]"
                      placeholder={t("last-name-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Second Row - Title and Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/**Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#F0EEF0]"
                      placeholder={t("title-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder={t("phone-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
