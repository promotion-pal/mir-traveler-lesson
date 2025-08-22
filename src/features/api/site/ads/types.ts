export type AdCategory =
  | "transport"
  | "housing"
  | "tour"
  | "recreation"
  | "excursion";

export interface HotOfferAd {
  id: string;
  category_type: AdCategory;
  title: string;
  address: BaseAdAddress;
  rating: number;
  photos: BaseAdPhoto[];
  is_favorite: boolean;

  room_count?: number;
  rent_type?: string;
  guests?: number;
  is_studio?: boolean;
  sleep_place_count?: number;
  price_per_hour?: number;
  price_per_day?: number;
  price_per_tour?: number;
  price_per_excursion?: number;
  average_bill?: number;
  is_last_minute_tour?: number;
  is_delivery?: boolean;
  link: string;
}

export type BaseAdAddress = {
  full_address: string;
  region?: string;
  city?: string;
  street?: string;
  latitude?: string;
  longitude?: string;
  station?: string;
};

export interface BaseAdPhoto {
  photo: string;
}
