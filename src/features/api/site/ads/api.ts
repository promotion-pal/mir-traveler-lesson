import { api, QueryParams } from "../../fetch";
import {
  AdBanner,
  AdCategory,
  BannerPlacement,
  HotOfferAd,
  MainAdsList,
  SearchParamsMainAds,
} from "./types";

class AdService {
  // private getAdUrl: Record<AdCategory, string> = {
  //   housing: "/site/ads/housing/",
  //   transport: "/site/ads/transport/",
  //   tour: "",
  //   recreation: "",
  //   excursion: "",
  // };

  async get(
    category: AdCategory,
    params?: SearchParamsMainAds
  ): Promise<MainAdsList> {
    return await api.get<MainAdsList>(`/site/ads/${category}/`, {
      params: params as QueryParams,
    });
  }

  async getBanners(placement?: BannerPlacement): Promise<AdBanner[]> {
    return await api.get<AdBanner[]>("/site/banners", {
      params: { placement },
    });
  }

  async getHotOffer(category: AdCategory): Promise<HotOfferAd[]> {
    if (!category) {
      return api.get<HotOfferAd[]>("/site/ads/main-widget-ads");
    } else {
      return api.get<HotOfferAd[]>(`/site/ads/${category}/section_widget_ads`);
    }
  }
}

export const adService = new AdService();
