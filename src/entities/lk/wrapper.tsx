import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import React, { ReactNode } from "react";

export function LkWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg bg-white px-6 py-5 h-fit">
      <p className="mb-3 text-xl font-medium">{title}</p>
      {children}
    </section>
  );
}
