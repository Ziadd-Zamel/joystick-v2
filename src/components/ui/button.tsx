import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HiArrowLongRight } from "react-icons/hi2";

const buttonVariants = cva(
  "inline-flex items-center justify-center rtl:flex-row-reverse gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer [&_svg]:shrink-0 hover:transition-all hover:duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-main genz:bg-gradient text-white hover:bg-pink-dark rounded-[10px] disabled:bg-gray-400",
        outline:
          "border border-main genz:border-gradient bg-background text-main hover:bg-main/10 disabled:bg-zinc-700/10 disabled:border-zinc-700 disabled:text-zinc-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:border-zinc-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-gray-200 border border-storm-100 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-zinc-500",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "rounded-md px-3 py-3",
        lg: "rounded-lg px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  routable?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      routable = false,
      children = "Button",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    void loading;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {loading && <Loader2 size={18} className="animate-spin" />}
        {routable && <HiArrowLongRight size={25} className="rtl:rotate-180" />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
