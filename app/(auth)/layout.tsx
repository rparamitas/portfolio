import React, { ReactNode } from "react";

const LayoutAuth = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default LayoutAuth;
