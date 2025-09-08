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
import { useTranslations } from "next-intl";
import { PasswordInput } from "./password-input";
// import RegisterMap from "./register-map";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RegisterFields, useRegisterSchema } from "@/lib/schemas/auth.schema";
import { registerUser } from "@/lib/actions/auth.actions";

export default function RegisterForm() {
  // Hooks
  const registerSchema = useRegisterSchema();
  const t = useTranslations("auth");

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Registration successful!", {
          description: "Your account has been created successfully.",
        });
        form.reset();
      } else {
        toast.error("Registration failed", {
          description: result.error || "Something went wrong. Please try again.",
        });
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        description: "An unexpected error occurred. Please try again.",
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

  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    console.log(values);
    registerMutation.mutate(values);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">{t("register")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("name-placeholder")} {...field} />
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                        <Input placeholder={t("floor-number")} type="number" min="1" {...field} />
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

            <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? t("registering") : t("register")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
