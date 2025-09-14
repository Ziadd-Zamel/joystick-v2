"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIncreaseQuantity } from "../hooks/use-increase-quantity";
import { useDecreaseQuantity } from "../hooks/use-decrease-quantity";

interface MutationQuantitySelectorProps {
  quantity: number;
  productId: string;
  cartId: string;
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

export default function MutationQuantitySelector({
  quantity,
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
  productId,
  cartId,
}: MutationQuantitySelectorProps) {
  const maxQuantity = max || availableQuantity || 999;

  const increaseQuantityMutation = useIncreaseQuantity();
  const decreaseQuantityMutation = useDecreaseQuantity();

  const handleDecrease = () => {
    if (quantity > min && !disabled && selectedColor) {
      decreaseQuantityMutation.mutate({ productId: productId, cartId: cartId });
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled && selectedColor) {
      increaseQuantityMutation.mutate({ productId: productId, cartId: cartId });
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

  // Check if any mutation is loading
  const isLoading = increaseQuantityMutation.isPending || decreaseQuantityMutation.isPending;

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <div
        className={cn(
          "flex items-center",
          currentSize.gap,
          orientation === "horizontal" ? "flex-row" : "flex-row",
        )}
      >
        <Button
          onClick={handleDecrease}
          disabled={
            quantity <= min ||
            disabled ||
            !selectedColor ||
            isLoading ||
            decreaseQuantityMutation.isPending
          }
          className={cn(
            "flex !size-6 items-center justify-center rounded-full bg-[#02A09B] text-[#02A09B] transition-all duration-200 hover:bg-[#02A09B]/90 focus:ring-2 focus:ring-[#02A09B] focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:opacity-50 disabled:hover:bg-gray-300",
            currentSize.button,
          )}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4 text-white" />
        </Button>

        <div className="flex h-6 w-[30px] items-center justify-center text-xl font-semibold">
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#02A09B]" />
          ) : (
            quantity
          )}
        </div>

        <Button
          onClick={handleIncrease}
          disabled={
            quantity >= maxQuantity ||
            disabled ||
            !selectedColor ||
            isLoading ||
            increaseQuantityMutation.isPending
          }
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
        <p className="text-xs text-gray-600 rtl:text-sm">
          {selectedColor ? `${availableText} ${availableQuantity || maxQuantity}` : selectColorText}
        </p>
      )}
    </div>
  );
}
