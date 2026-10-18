import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-input placeholder:text-muted-foreground focus-visible:outline-primary aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded border-2 px-3 py-2 text-sm shadow-sm transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
