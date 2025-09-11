/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

export default function AddressCombobox({ addresses, value, onChange, error }) {
  const [open, setOpen] = useState(false)

  // Find the selected address name
  const selectedAddress = addresses.find((address) => address.id?.toString() === value)?.address || ""

  return (
    <div className="space-y-2">
      <Label htmlFor="address">العنوان</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? selectedAddress : "اختر العنوان..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن عنوان..." />
            <CommandList>
              {addresses.length === 0 ? (
                <CommandEmpty>لا توجد عناوين متاحة. يرجى إضافة عنوان أولاً.</CommandEmpty>
              ) : (
                <>
                  <CommandEmpty>لم يتم العثور على عنوان</CommandEmpty>
                  <CommandGroup>
                    {addresses.map((address) => (
                      <CommandItem
                        key={address.id}
                        value={address.address}
                        onSelect={() => {
                          onChange(address.id.toString())
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", value === address.id.toString() ? "opacity-100" : "opacity-0")}
                        />
                        {address.address}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
