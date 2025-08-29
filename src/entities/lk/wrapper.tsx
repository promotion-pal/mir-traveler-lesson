import { cn } from "@/shared/lib/utils";
import React, { ReactNode } from "react";

export function LkWrapper({
  title,
  children,
  styleWrapper,
}: {
  title: string;
  children: ReactNode;
  styleWrapper?: string;
}) {
  return (
    <section
      className={cn("rounded-lg bg-white px-6 py-5 h-fit", styleWrapper)}
    >
      <p className="mb-3 text-xl font-medium">{title}</p>
      {children}
    </section>
  );
}
