import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck, CircleEqualIcon } from "lucide-react";

const Alert = ({
  success,
  error,
  message,
}: {
  success?: boolean;
  error?: boolean;
  message: string;
}) => {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-2 rounded-md p-3",
        success &&
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        error && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        !success &&
          !error &&
          "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      )}
    >
      <span>
        {success && <CircleCheck size={10} />}
        {error && <CircleAlert size={10} />}
        {!success && !error && <CircleEqualIcon size={10} />}
      </span>
      {message}
    </div>
  );
};

export default Alert;
