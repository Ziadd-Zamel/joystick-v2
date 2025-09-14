"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function TimeSlots({ times, isLoading, error, value, onChange, validationError }) {
  // Format time from "HH:MM:SS" to "HH:MM"
  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = Number.parseInt(hours, 10);

      // Convert to 12-hour format with AM/PM
      const period = hour >= 12 ? "م" : "ص";
      const displayHour = hour % 12 || 12;

      return `${displayHour}:${minutes} ${period}`;
    } catch (e) {
      void e;
      return timeString;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>الوقت المتاح</Label>
        <div className="flex h-20 items-center justify-center rounded-md bg-gray-50">
          <p className="text-gray-500">جاري تحميل الأوقات المتاحة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Label>الوقت المتاح</Label>
        <div className="flex h-20 items-center justify-center rounded-md bg-red-50">
          <p className="text-red-500">حدث خطأ أثناء تحميل الأوقات المتاحة</p>
        </div>
      </div>
    );
  }

  if (!isLoading && !error && times.length === 0) {
    return (
      <div className="space-y-2">
        <Label>الوقت المتاح</Label>
        <div className="flex h-20 items-center justify-center rounded-md bg-gray-50">
          <p className="text-gray-500">لا يوجد اوقات متاحة هذا اليوم.</p>
        </div>
      </div>
    );
  }

  if (!times || times.length === 0) {
    return (
      <div className="space-y-2">
        <Label>الوقت المتاح</Label>
        <div className="flex h-20 items-center justify-center rounded-md bg-gray-50">
          <p className="text-gray-500">يرجى اختيار تاريخ أولاً لعرض الأوقات المتاحة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>الوقت المتاح</Label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {times.map((time) => (
          <Button
            key={time.id}
            type="button"
            variant={value === time.id.toString() ? "default" : "outline"}
            className="flex h-auto items-center gap-2 py-3"
            onClick={() => onChange(time.id.toString())}
          >
            <Clock className="h-4 w-4" />
            <span>{formatTime(time.time)}</span>
          </Button>
        ))}
      </div>
      {validationError && <p className="text-sm text-red-500">{validationError}</p>}
    </div>
  );
}
