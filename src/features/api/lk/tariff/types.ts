interface LkTariffActivate {
  tariff_mode: string;
  activated_date: string;
  full_period: string;
  remain_period: string;
  price: string;
  expired_date: string;
}

interface LkTariffPrices {
  period: number;
  price: number;
  full_price: string;
  full_price_for_day: string;
}

export interface LkTariff {
  id: number;
  mode: string;
  title: string;
  description: string;
  category_type: string;
  city: string;
  is_activated: boolean;
  activated_data: LkTariffActivate;
  prices: LkTariffPrices[];
}
