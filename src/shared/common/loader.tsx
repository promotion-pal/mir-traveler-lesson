import { Loader2Icon } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";

interface CommonLoaderProps {
  iconStyle?: string;
  wrapperStyle?: string;
  iconSize?: number;
}
export function CommonLoader({
  iconStyle,
  wrapperStyle,
  iconSize = 45,
}: CommonLoaderProps) {
  return (
    <div
      className={cn(
        "w-full py-4 flex justify-center items-center rounded-xl",
        wrapperStyle
      )}
    >
      <Loader2Icon
        size={iconSize}
        className={cn("animate-spin text-gray-400", iconStyle)}
      />
    </div>
  );
}
