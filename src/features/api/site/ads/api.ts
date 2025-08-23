import { api } from "../../fetch";
import { AdBanner, AdCategory, BannerPlacement, HotOfferAd } from "./types";

class AdService {
  async getById() {}

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
