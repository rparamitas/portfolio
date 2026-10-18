import { Calendar } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatIsoDate } from "@/lib/date";

// Every post on the site is authored by Rahmita — it is her personal blog.
const AuthorMeta = ({
  date,
  size = "default",
}: {
  date: string;
  size?: "default" | "lg";
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar size={size}>
        <AvatarImage src="/rahmita.png" alt="Rahmita Paramita Sudirman" />
      </Avatar>
      <div>
        <p className="font-head text-sm font-medium">
          Rahmita Paramita Sudirman
        </p>
        <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
          <time dateTime={date}>{formatIsoDate(date)}</time>
        </p>
      </div>
    </div>
  );
};

export default AuthorMeta;
