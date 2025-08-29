"use client";

import { CommonTabs, TabItem } from "@/entities/common/tab";
import { LkWrapper } from "@/entities/lk/wrapper";
import { AdCategory } from "@/features/api/site/ads";
import { ClientUserAdsUi } from "@/widgets/lk/ads/user";

export default function LkMyAdsPage() {
  const TABS_USER_ADS: TabItem<AdCategory>[] = [
    {
      label: "Транспорт",
      value: "transport",
    },
    {
      label: "Квартира",
      value: "housing",
    },
    {
      label: "Экскурсии",
      value: "excursion",
    },
    {
      label: "Отдых",
      value: "recreation",
    },
    {
      label: "Тур",
      value: "tour",
    },
  ];

  return (
    <LkWrapper title="Мои объявления">
      <CommonTabs tabs={TABS_USER_ADS} initialTab="transport">
        {(activeTab) => <ClientUserAdsUi category={activeTab} />}
      </CommonTabs>
    </LkWrapper>
  );
}
