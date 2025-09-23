import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const FloatingInput = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  width,
  error = "",
  required = true,
  showPasswordToggle = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`relative ${
        width ? `w-[${width}px]` : ""
      } flex flex-col gap-[2px] h-[66px]`}
    >
      <div
        className={`
      absolute left-3 px-1 bg-white transition-all duration-300 ease-in-out
      pointer-events-none
      ${
        isFocused || value.length > 0
          ? "top-[-8px] left-[8px] text-xs text-muted-foreground"
          : "top-[21px] -translate-y-1/2 text-sm text-[#3e424a]"
      }
    `}
      >
        {placeholder}
        {required && <span className="text-sm text-[#FF4000]">*</span>}
      </div>

      <input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${
          error ? "border-[#FF4000]" : "border-[#e1dfe1]"
        } "w-full h-[42px] px-4 border rounded-lg bg-white focus:outline-none focus:border-ring transition-all duration-300`}
      />

      {showPasswordToggle && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-[21px] transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
      {error ? (
        <span className="text-[10px] text-[#FF4000] font-[300] leading-[15px] ml-[6px]">
          {error}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
