import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const LayoutAuth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        render={<Link href="/" />}
        className="absolute top-4 left-4 z-10"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Button>
      {children}
    </div>
  );
};

export default LayoutAuth;
