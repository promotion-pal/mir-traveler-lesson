"use client";

import { AdminWrapper } from "@/entities/admin/wrapper";
import { CommonTabs } from "@/entities/common/tab";
import { ClientAdsModeration } from "@/widgets/admin/ads/moderationTable";

export default function AdminModerationPage() {
  const TABS = [
    {
      label: "Жилье",
      value: "housing",
    },
    {
      label: "Транспорт",
      value: "transport",
    },
    {
      label: "Туры",
      value: "tour",
    },
    {
      label: "Экскурсии",
      value: "excursion",
    },
    {
      label: "Отдых",
      value: "recreation",
    },
  ] as const;

  return (
    <AdminWrapper title="Модерация объявлений">
      <CommonTabs tabs={TABS} initialTab="housing">
        {(actionTab) => <ClientAdsModeration activeType={actionTab} />}
      </CommonTabs>
    </AdminWrapper>
  );
}
