import { CommonReqList } from "../../types";

export type AdCategory =
  | "transport"
  | "housing"
  | "tour"
  | "recreation"
  | "excursion";

export type BackAdCategory =
  | "rent_housing"
  | "rent_transport"
  | "recreation"
  | "tour"
  | "excursion";

export interface MainAdsList extends CommonReqList {
  results: MainAds[];
}
export type MainAds = TransportMainAds;
export interface BaseMainAds {
  id: number;
  title: string;
  text: string;
}
interface TransportMainAds extends BaseMainAds {}

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

export interface PriceAdVariant {
  price?: number;
  price_per_excursion?: number;
  price_per_tour?: number;
  price_per_day?: number;
  price_per_hour?: number;
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

export interface AdPhoto {
  id: number;
  photo: string;
}

export type BannerPlacement =
  | "main_page"
  | "housing"
  | "transport"
  | "recreation"
  | "tour"
  | "excursion";
export type SliderImage = {
  image: string;
};
export interface AdBanner {
  slider_images: SliderImage[];
  placement: BannerPlacement;
  banner_image: string;
  banner_title: string;
  slider_title: string;
}

export interface BaseSearchParams {
  count?: number;
  search?: string;
}
export interface SearchParamsMainAds extends BaseSearchParams {
  housing_type?: number;
}
