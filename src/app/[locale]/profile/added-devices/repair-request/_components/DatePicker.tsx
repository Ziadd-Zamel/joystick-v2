/* eslint-disable react/prop-types */
"use client"

import * as React from "react"
import { format, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// أسماء الأشهر بالعربية
const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
]

// أسماء أيام الأسبوع بالعربية
const arabicDays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

export default function DatePicker({ days, value, onChange, error }) {
  const [date, setDate] = React.useState(null)

  // Create a map of available dates for quick lookup
  const availableDatesMap = React.useMemo(() => {
    const map = new Map()
    days.forEach((day) => {
      map.set(day.date, day.id)
    })
    return map
  }, [days])

  // Create an array of Date objects for the available dates
  const availableDates = React.useMemo(() => {
    return days
      .map((day) => {
        try {
          const date = new Date(day.date)
          return isValid(date) ? date : null
        } catch (e) {
          void e;
          return null
        }
      })
      .filter(Boolean)
  }, [days])

  // Find the selected day object based on the value (day_id)
  React.useEffect(() => {
    if (value) {
      const selectedDay = days.find((day) => day.id.toString() === value)
      if (selectedDay) {
        try {
          const date = new Date(selectedDay.date)
          if (isValid(date)) {
            setDate(date)
          }
        } catch (e) {
          console.error("تاريخ غير صالح:", e)
        }
      }
    } else {
      setDate(null)
    }
  }, [value, days])

  // Function to check if a date is available
  const isDateAvailable = (date) => {
    if (!date || !isValid(date)) return false

    try {
      // Format the date to match our API format
      const dateString = format(date, "yyyy-MM-dd")
      return availableDatesMap.has(dateString)
    } catch (error) {
      console.error("خطأ في تنسيق التاريخ:", error)
      return false
    }
  }

  // تنسيق التاريخ بالعربية
  const formatDateInArabic = (date) => {
    if (!date || !isValid(date)) return "اختر التاريخ..."

    try {
      const day = date.getDate()
      const month = arabicMonths[date.getMonth()]
      const year = date.getFullYear()
      const weekday = arabicDays[date.getDay()]

      return `${weekday}، ${day} ${month} ${year}`
    } catch (error) {
      console.error("خطأ في تنسيق التاريخ بالعربية:", error)
      return "اختر التاريخ..."
    }
  }

  const handleSelect = (selectedDate) => {
    setDate(selectedDate)

    if (selectedDate && isValid(selectedDate)) {
      try {
        const dateString = format(selectedDate, "yyyy-MM-dd")
        const dayId = availableDatesMap.get(dateString)

        if (dayId) {
          onChange(dayId.toString())
        }
      } catch (error) {
        console.error("خطأ في معالجة اختيار التاريخ:", error)
      }
    } else {
      onChange("")
    }
  }

  // فلترة التواريخ القديمة
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn("w-full justify-start text-right", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {formatDateInArabic(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => {
              // تعطيل التواريخ التي ليست في قائمة التواريخ المتاحة أو التواريخ القديمة
              const isAvailable = availableDates.some(
                (availableDate) =>
                  availableDate.getDate() === date.getDate() &&
                  availableDate.getMonth() === date.getMonth() &&
                  availableDate.getFullYear() === date.getFullYear(),
              )
              const isPastDate = date < today
              return !isAvailable || isPastDate
            }}
            modifiers={{
              available: (date) => isDateAvailable(date),
            }}
            modifiersClassNames={{
              available: "bg-primary/20 hover:bg-primary/30 font-medium",
            }}
            className="rtl"
            classNames={{
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            weekStartsOn={6} // يبدأ الأسبوع من يوم السبت
            locale={{
              localize: {
                day: (n) => arabicDays[n],
                month: (n) => arabicMonths[n],
              },
              formatLong: {
                date: () => "dd/MM/yyyy",
              },
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
