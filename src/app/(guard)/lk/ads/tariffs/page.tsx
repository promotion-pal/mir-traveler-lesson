"use client";

import { Button } from "@/shared/ui/button";
import { CardTariffLkUi, WrapperTariffLkUi } from "@/widgets/lk/tariff";

export default function LkAdTariffPage() {
  const mockLkTariffs = [
    {
      id: 1,
      mode: "premium",
      title: "Премиум тариф",
      description: "Полный доступ ко всем функциям платформы",
      category_type: "business",
      city: "Москва",
      is_activated: true,
      activated_data: {
        tariff_mode: "monthly",
        activated_date: "2024-01-15T10:30:00Z",
        full_period: "30 дней",
        remain_period: "15 дней",
        price: "1500 руб.",
        expired_date: "2024-02-14T23:59:59Z",
      },
      prices: [
        {
          period: 30,
          price: 1500,
          full_price: "1500 руб.",
          full_price_for_day: "50 руб./день",
        },
        {
          period: 90,
          price: 4000,
          full_price: "4000 руб.",
          full_price_for_day: "44.44 руб./день",
        },
      ],
    },
  ];

  return (
    <div>
      {mockLkTariffs.map((tariff) => (
        <WrapperTariffLkUi title="Простое размещение">
          <p></p>
          {/* <CardTariffLkUi key={tariff.id} {...tariff} /> */}
        </WrapperTariffLkUi>
      ))}
    </div>
  );
}
