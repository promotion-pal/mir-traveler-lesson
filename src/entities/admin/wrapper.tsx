import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

interface AdminWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}
export function AdminWrapper({
  title,
  children,
  className,
}: AdminWrapperProps) {
  return (
    <div className={cn(className)}>
      <p className="mb-7 text-xl font-medium">{title}</p>

      {children}
    </div>
  );
}
