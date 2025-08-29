"use client";

import { CommonTabs, TabItem } from "@/entities/common/tab";
import { AdminTariffCategory } from "@/features/api/admin/tariff";

export default function AdminTariffPage() {
  const TARIFF_TABS: TabItem<AdminTariffCategory>[] = [
    {
      label: "Настройки по умолчанию",
      value: "scaleDefault",
    },
    {
      label: "Пополнение кошелька",
      value: "scaleByCity",
    },
    {
      label: "Настройка",
      value: "default",
    },
  ] as const;

  return (
    <div>
      <CommonTabs tabs={TARIFF_TABS} initialTab="default">
        {(actionTab) => <div></div>}
      </CommonTabs>
      page
    </div>
  );
}
