"use client";

import { cn } from "@/shared/lib/utils";
import { ReactNode, useState } from "react";

export type TabItem<T extends string> = {
  label: string;
  value: T;
};

interface CommonTabsProps<T extends string> {
  tabs: readonly TabItem<T>[];
  initialTab: T;
  children: (activeTab: T) => ReactNode;
}

export function CommonTabs<T extends string>({
  tabs,
  initialTab,
  children,
}: CommonTabsProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const handleTabChange = (tabValue: T) => {
    setActiveTab(tabValue);
  };

  return (
    <>
      <div className="flex gap-5 mb-6 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabChange(tab.value)}
            className={cn(
              "whitespace-nowrap border-b-2 border-gray-200 pb-1",
              activeTab === tab.value && "border-primary text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {children(activeTab)}
    </>
  );
}
