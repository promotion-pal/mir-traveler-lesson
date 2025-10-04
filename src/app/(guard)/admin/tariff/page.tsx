"use client";

import { CommonTabs, TabItem } from "@/entities/common/tab";
import { AdminTariffCategory } from "@/features/api/admin/tariff";
import {
  ClientTariffTableScale,
  ClientTariffTableScaleByCity,
  ClientTariffTableSetting,
} from "@/widgets/admin/tariff/tariffTableScale";

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
        {(actionTab) =>
          (actionTab === "default" && <ClientTariffTableSetting />) ||
          (actionTab === "scaleDefault" && <ClientTariffTableScale />) ||
          (actionTab === "scaleByCity" && <ClientTariffTableScaleByCity />)
        }
      </CommonTabs>
    </div>
  );
}
