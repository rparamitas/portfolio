import { cn } from "@/lib/utils";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);

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
      <input
        type={type}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "my-2 w-full rounded-md border border-slate-300 p-3 outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700",
          errors[id] && "border-red-500",
          inputClassName,
        )}
        {...register(id as Path<T>)}
      />
      {message && <p className="mt-1 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default FormField;
