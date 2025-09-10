import React from "react";
import { cn } from "@/lib/utils";

interface ProductColor {
  color: string;
  quantity: number;
}

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor?: string;
  onColorSelect: (color: string) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  showQuantity?: boolean;
  className?: string;
  disabled?: boolean;
  colorSize?: "sm" | "md" | "lg";
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
  label = "الألوان",
  size = "md",
  orientation = "horizontal",
  className,
  disabled = false,
  colorSize = "md",
}: ColorSelectorProps) {
  const sizeClasses = {
    sm: {
      label: "text-sm font-medium",
      gap: "gap-2",
      container: "gap-1",
    },
    md: {
      label: "text-lg font-medium",
      gap: "gap-2",
      container: "gap-4",
    },
    lg: {
      label: "text-xl font-semibold",
      gap: "gap-3",
      container: "gap-6",
    },
  };

  const colorSizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const currentSize = sizeClasses[size];
  const currentColorSize = colorSizeClasses[colorSize];

  // Only show component if there are multiple colors
  //   if (!colors || colors.length <= 1) {
  //     return null;
  //   }

  return (
    <div className={cn("mb-8 flex flex-col", currentSize.gap, className)}>
      <label className={currentSize.label}>{label}</label>
      <div
        className={cn(
          "flex items-center",
          currentSize.container,
          orientation === "vertical" ? "flex-col items-start" : "flex-row",
        )}
      >
        {colors.map(({ color }) => (
          <label
            key={color}
            className={cn(
              "flex cursor-pointer items-center gap-2",
              disabled && "cursor-not-allowed opacity-50",
              orientation === "vertical" && "w-full",
            )}
          >
            <input
              type="radio"
              name="color"
              value={color}
              id={`color-${color}`}
              className="hidden"
              checked={selectedColor === color}
              onChange={() => !disabled && onColorSelect(color)}
              disabled={disabled}
            />
            <span
              className={cn(
                "rounded-full border-2 transition-all duration-200",
                currentColorSize,
                selectedColor === color
                  ? "border-[#02A09B] ring-2 ring-[#02A09B] ring-offset-1"
                  : "border-gray-300 hover:border-gray-400",
                disabled && "opacity-50",
              )}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
            {orientation === "vertical" && (
              <span className="text-sm text-gray-700 capitalize">{color}</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
