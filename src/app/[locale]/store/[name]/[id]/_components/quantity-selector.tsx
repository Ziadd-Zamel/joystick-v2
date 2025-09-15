import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  availableQuantity?: number;
  selectedColor?: boolean;
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  showAvailableText?: boolean;
  availableText?: string;
  selectColorText?: string;
  className?: string;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max,
  availableQuantity,
  selectedColor = true,
  size = "md",
  orientation = "vertical",
  showAvailableText = true,
  availableText = "Available quantity",
  selectColorText = "Please select a color",
  className,
  disabled = false,
}: QuantitySelectorProps) {
  const maxQuantity = max || availableQuantity || 999;

  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: {
      button: "size-8 text-sm",
      text: "text-base",
      input: "w-12 h-8 text-sm",
      gap: "gap-2",
    },
    md: {
      button: "size-10 text-base",
      text: "text-xl",
      input: "w-16 h-10 text-base",
      gap: "gap-3",
    },
    lg: {
      button: "size-12 text-lg",
      text: "text-2xl",
      input: "w-20 h-12 text-lg",
      gap: "gap-4",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex items-center",
          currentSize.gap,
          orientation === "horizontal" ? "flex-row" : "flex-row",
        )}
      >
        <Button
          onClick={handleDecrease}
          disabled={quantity <= min || disabled || !selectedColor}
          className={cn(
            "flex !size-6 items-center justify-center rounded-full bg-[#02A09B] text-[#02A09B] transition-all duration-200 hover:bg-[#02A09B]/90 focus:ring-2 focus:ring-[#02A09B] focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 disabled:hover:bg-gray-300",
            currentSize.button,
          )}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4 text-white" />
        </Button>

        <div className="flex w-[30px] items-center justify-center text-xl font-semibold">
          {quantity}
        </div>

        <Button
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity || disabled || !selectedColor}
          className={cn(
            "flex !size-6 items-center justify-center rounded-full bg-[#02A09B] text-[#02A09B] transition-all duration-200 hover:bg-[#02A09B]/90 focus:ring-2 focus:ring-[#02A09B] focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 disabled:hover:bg-gray-300",
            currentSize.button,
          )}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
      </div>

      {showAvailableText && (
        <p className="text-sm text-gray-600">
          {selectedColor
            ? `${availableText}: ${availableQuantity || maxQuantity}`
            : selectColorText}
        </p>
      )}
    </div>
  );
}
