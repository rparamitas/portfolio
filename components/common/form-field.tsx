"use client";

import { useState, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  /** Leading addon icon rendered inside the input group. */
  icon?: ReactNode;
  /** Adds a show/hide toggle addon (for password fields). */
  passwordToggle?: boolean;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  className,
  register,
  errors,
  icon,
  passwordToggle = false,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    passwordToggle && type === "password" && showPassword ? "text" : type;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <InputGroup
        className={cn(
          "h-11 border-black shadow-xs",
          errors[id] && "border-destructive",
          className,
        )}
      >
        <InputGroupInput
          id={id}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id as Path<T>)}
        />
        {icon && <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>}
        {passwordToggle && type === "password" && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default FormField;
