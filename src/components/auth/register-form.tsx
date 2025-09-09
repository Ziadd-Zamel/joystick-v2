"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";
import { PasswordInput } from "./password-input";
// import RegisterMap from "./register-map";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegisterFields, useRegisterSchema } from "@/lib/schemas/auth.schema";
import { registerUser } from "@/lib/actions/auth.actions";

export default function RegisterForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  // Translations
  const t = useTranslations("auth");

  // Hooks
  const registerSchema = useRegisterSchema();
  const locale = useLocale();

  // Mutation
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(t("registrationSuccessTitle"));
        form.reset();
        setOpen(false);
      } else {
        toast.error(t("registrationFailedTitle"));
      }
    },
    onError: () => {
      toast.error(t("registrationFailedTitle"), {
        description: t("registrationErrorDescription"),
      });
    },
  });

  // Form
  const form = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      building_number: "",
      floor_number: "",
      apartment_number: "",
      address: "",
      governorate: "",
      city: "",
    },
  });
  // Submit Function
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    console.log(values);
    registerMutation.mutate(values);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl bg-white">
      <CardHeader className="sr-only">
        <CardTitle className="text-center text-2xl font-bold">{t("register")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            dir={locale === "ar" ? "rtl" : "ltr"}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#F0EEF0]"
                        placeholder={t("name-placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("phone-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password-label")}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder={t("password-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirm-password-label")}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder={t("confirm-password-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold">{t("address")}</FormLabel>

              {/* Building/Floor/Apartment Row */}
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="building_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t("building-number")}
                          type="number"
                          min="1"
                          {...field}
                          className="h-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floor_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-6"
                          placeholder={t("floor-number")}
                          type="number"
                          min="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-6"
                          placeholder={t("apartment-number")}
                          type="number"
                          min="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Main Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("address-placeholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="space-y-2">
                <FormLabel className="text-muted-foreground text-sm">
                  Click on the map to select your location
                </FormLabel>
                <RegisterMap setValue={form.setValue} watch={form.watch} />
              </div> */}
            </div>

            <Button className="w-full py-6" type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? t("registering") : t("register")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
