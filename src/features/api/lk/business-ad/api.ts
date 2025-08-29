import { ur } from "zod/v4/locales";
import { api } from "../../fetch";
import { AdCategory } from "../../site/ads";
import { UserAdsRequest } from "./types";

class BusinessAdService {
  private getCategoryAdUrl(type: AdCategory): string {
    const baseUrls: Record<AdCategory, string> = {
      transport: "/site/ads/business-transport/",
      housing: "/site/ads/business-housing/",
      tour: "/site/ads/business-tour/",
      excursion: "/site/ads/business-excursion/",
      recreation: "/site/ads/business-recreation/",
    };

    return baseUrls[type];
  }

  public async checkAddressDuplicates(type: AdCategory, address: string) {
    const url = this.getCategoryAdUrl(type);
    return await api.postWithToken(url + "check_address_duplicates/", {
      address: address,
    });
  }

  async checkText(string: string) {
    return api.postWithToken<string>("/site/ads/check_text", { title: string });
  }
  async getUserAds(category: AdCategory): Promise<UserAdsRequest> {
    const url = this.getCategoryAdUrl(category);
    return await api.getWithToken<UserAdsRequest>(url);
  }
}

export const businessAdService = new BusinessAdService();
