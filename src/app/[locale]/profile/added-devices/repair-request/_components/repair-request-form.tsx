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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/routing";
import { sendRepairRequest } from "@/lib/actions/profile.actions";
import { RepairRequeseFormValues, repairRequestSchema } from "@/lib/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import JoystickViewer from "./joystick-viewer";
import SelectAvaliableTime from "./select-avaliable-time";
import SelectAvilableDay from "./select-avilable-day";
import SelectUserAddress from "./select-user-address";

export default function RepairRequestForm() {
  const t = useTranslations("profile-route");
  const router = useRouter();
  const params = useParams();
  const { deviceId } = params;

  const form = useForm<RepairRequeseFormValues>({
    resolver: zodResolver(repairRequestSchema(t)),
    defaultValues: {
      deviceId,
      addressId: "",
      availableDay: undefined,
      availableDayId: "",
      availableTimeId: "",
      extraNotes: "",
      problemsParts: [],
    },
  });

  async function onSubmit(values: RepairRequeseFormValues) {
    try {
      const payload = await sendRepairRequest(values);
      toast.success(payload.message);

      router.push("/profile/previous-orders/?orderType=repair");
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  // Handle part selection
  const togglePart = (partId: number) => {
    const currentParts: number[] = form.getValues("problemsParts");
    if (currentParts?.includes(partId)) {
      form.setValue(
        "problemsParts",
        currentParts.filter((id) => id !== partId),
      );
    } else {
      form.setValue("problemsParts", [...currentParts, partId]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 rounded-md border p-5 md:grid-cols-2">
          {/* User address */}
          <SelectUserAddress form={form} />

          {/* Avaliable Dayes */}
          <SelectAvilableDay form={form} />

          {/* Avilable time */}
          <SelectAvaliableTime form={form} />
        </div>

        {/* Select parts */}
        <div className="rounded-md border p-5">
          <FormField
            control={form.control}
            name="problemsParts"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <JoystickViewer selectedParts={field.value} togglePart={togglePart} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Another notes */}
        <div className="rounded-md border p-5">
          <FormField
            control={form.control}
            name="extraNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4 flex flex-col items-start">
                  {t("extra-notes-label")}
                  <span className="text-sm font-normal text-zinc-600">
                    {t("extra-notes-description")}
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("extra-notes-placeholder")}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
