"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full placeholder:text-sm rounded-sm h-12 px-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white text-zinc-500 placeholder:text-zinc-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-[#F0EEF0] bg-background",
        outline:
          "rounded-sm border-[#F0EEF0] border  hover:border-gray-shade-400 text-zinc-800 pla ceholder:text-black/50 focus:border-main disabled:bg-gray-200 disabled:border-none",
      },
      state: {
        default: "",
        error: "border-red-500 hover:border-red-500 focus:border-red-500",
      },
      inputSize: {
        default: "p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, state, placeholder = "Placeholder", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            inputVariants({ variant, inputSize, state, className }),
            type === "search" && "ps-10",
          )}
          ref={ref}
          {...props}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
