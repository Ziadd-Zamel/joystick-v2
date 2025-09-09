import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

export const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  (props, ref) => {
    // State
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {/* Input */}
        <Input type={showPassword ? "text" : "password"} {...props} ref={ref} />

        {/* Toggle visibility */}
        <button
          type="button"
          className="absolute top-0 right-0 h-full cursor-pointer px-3 rtl:right-auto rtl:left-0"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <VscEye className="h-6 w-6 text-gray-400" />
          ) : (
            <VscEyeClosed className="h-6 w-6 text-gray-400" />
          )}
          <span className="sr-only">passwordInput</span>
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
