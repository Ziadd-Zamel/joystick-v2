"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Import your existing components
import JoystickViewer from "./JoystickViewer";
import TimeSlots from "./TimeSlots";

// API base URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Zod validation schema
const formSchema = z.object({
  address_id: z.string().min(1, "العنوان مطلوب"),
  day_id: z.string().min(1, "اليوم مطلوب"),
  available_time_id: z.string().min(1, "الوقت مطلوب"),
  device_id: z.string().default("62"),
  Problems_Parts: z.array(z.string()).min(1, "يجب اختيار جزء واحد على الأقل"),
  notes: z.string().max(500, "الملاحظات لا يمكن أن تتجاوز 500 حرف").optional(),
});

// API functions
const fetchAddresses = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("غير مصرح: لم يتم العثور على رمز الوصول");

  const response = await fetch(`${apiUrl}addresses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("فشل في جلب العناوين");
  }

  const data = await response.json();
  return data.data.data || [];
};

const fetchDays = async () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("غير مصرح: لم يتم العثور على رمز الوصول");

  const response = await fetch(`${apiUrl}user/available-days/get-all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("فشل في جلب الأيام المتاحة");
  }

  const data = await response.json();
  return data.data || [];
};

const fetchTimes = async (dayId) => {
  if (!dayId) return [];

  const response = await fetch(`${apiUrl}available-times/get/${dayId}`);

  if (!response.ok) {
    throw new Error("فشل في جلب الأوقات المتاحة");
  }

  const data = await response.json();
  return data.data || [];
};

export default function RepairRequestForm() {
  const [selectedDayId, setSelectedDayId] = useState(null);

  // Initialize React Hook Form with Zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address_id: "",
      day_id: "",
      available_time_id: "",
      device_id: "62",
      Problems_Parts: [],
      notes: "",
    },
  });

  // Watch day_id to fetch times
  const watchedDayId = form.watch("day_id");

  // Fetch addresses
  const {
    data: addresses = [],
    isLoading: isLoadingAddresses,
    error: addressesError,
  } = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch available days
  const {
    data: availableDays = [],
    isLoading: isLoadingDays,
    error: daysError,
  } = useQuery({
    queryKey: ["availableDays"],
    queryFn: fetchDays,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch available times for selected day
  const {
    data: availableTimes = [],
    isLoading: isLoadingTimes,
    error: timesError,
  } = useQuery({
    queryKey: ["availableTimes", watchedDayId],
    queryFn: () => fetchTimes(watchedDayId),
    enabled: !!watchedDayId,
    staleTime: 5 * 60 * 1000,
  });

  // Create repair request mutation
  const createRepairRequest = useMutation({
    mutationFn: async (values) => {
      const token = Cookies.get("token");
      if (!token) throw new Error("غير مصرح: لم يتم العثور على رمز الوصول");

      const response = await fetch(`${apiUrl}repair-requests/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address_id: values.address_id,
          day_id: values.day_id,
          available_time_id: values.available_time_id,
          type: "personal",
          devices: [
            {
              device_id: values.device_id,
              Problems_Parts: values.Problems_Parts,
              notes: values.notes,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "فشل إرسال طلب الصيانة");
        throw new Error(errorData.message || "فشل إرسال طلب الصيانة");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("تم إرسال طلب الصيانة بنجاح");
      form.reset();
    },
  });

  // Handle part selection
  const togglePart = (partId) => {
    const currentParts = form.getValues("Problems_Parts");
    if (currentParts.includes(partId)) {
      form.setValue(
        "Problems_Parts",
        currentParts.filter((id) => id !== partId),
      );
    } else {
      form.setValue("Problems_Parts", [...currentParts, partId]);
    }
  };

  // Handle day selection and reset time
  const handleDaySelect = (dayId) => {
    form.setValue("day_id", dayId);
    form.setValue("available_time_id", ""); // Reset time selection
    setSelectedDayId(dayId);
  };

  // Form submission handler
  const onSubmit = (values) => {
    createRepairRequest.mutate(values);
  };

  // Show loading state
  if (isLoadingAddresses || isLoadingDays) {
    return <div className="py-8 text-center">جاري تحميل البيانات...</div>;
  }

  // Show error state
  if (addressesError || daysError) {
    return (
      <div className="py-8 text-center text-red-500">
        حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الزيارة</CardTitle>
            <CardDescription>اختر العنوان والوقت المناسب للزيارة</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {/* العنوان */}
            <FormField
              control={form.control}
              name="address_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العنوان" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addresses?.length === 0 ? (
                        <div className="py-2 text-center text-sm text-gray-500">
                          لا يوجد عناوين متاحة
                        </div>
                      ) : (
                        addresses.map((address) => (
                          <SelectItem key={address.id} value={address.id.toString()}>
                            {address.address}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* اليوم */}
            <FormField
              control={form.control}
              name="day_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الأيام المتاحة</FormLabel>
                  <Select onValueChange={handleDaySelect} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اليوم" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDays?.length === 0 ? (
                        <div className="py-2 text-center text-sm text-gray-500">
                          لا يوجد أيام متاحة
                        </div>
                      ) : (
                        availableDays.map((day) => (
                          <SelectItem key={day.id} value={day.id.toString()}>
                            {day.name || day.date}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الوقت المتاح */}
            <div className="sm:col-span-2">
              <FormField
                control={form.control}
                name="available_time_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الأوقات المتاحة</FormLabel>
                    <FormControl>
                      <TimeSlots
                        times={availableTimes}
                        isLoading={isLoadingTimes}
                        error={timesError}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* الأجزاء المطلوبة */}
        <Card>
          <CardHeader>
            <CardTitle>الأجزاء المطلوبة</CardTitle>
            <CardDescription>اختر الأجزاء التي تحتاج إلى صيانة</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="Problems_Parts"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <JoystickViewer selectedParts={field.value} togglePart={togglePart} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* الملاحظات */}
        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
            <CardDescription>أضف أي ملاحظات إضافية عن المشكلة</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل ملاحظاتك هنا..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>الحد الأقصى 500 حرف</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* زر الإرسال */}
        <div className="flex justify-end">
          <Button type="submit" disabled={createRepairRequest.isPending} size="lg">
            {createRepairRequest.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
