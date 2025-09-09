"use client";
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
import { updateUserEmail } from "@/lib/actions/profile.actions";
import { ProfileEmailFormValues, profileEmailSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileEmailForm() {
  const t = useTranslations("profile-route");

  const form = useForm<ProfileEmailFormValues>({
    resolver: zodResolver(profileEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ProfileEmailFormValues) {
    try {
      const payload = await updateUserEmail(values);
      toast.success(payload.message);
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message);
    }
  }

  return (
    <div className="rounded-md border border-zinc-200 bg-white">
      <h2 className="border-b border-zinc-200 p-4 text-lg font-medium">{t("profile-email")}</h2>

      {/* Profile form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 p-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input className="rounded-md" placeholder={t("email")} type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit" className="self-end">
            {t("save-changes")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
