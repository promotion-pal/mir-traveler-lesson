import { api } from "../../fetch";
import { AdCategory } from "../../site/ads";
import { InfoAdminAdsModeration } from "./types";

class AdminAdsService {
  private getModerationUrl(type: AdCategory): string {
    const baseUrls: Record<AdCategory, string> = {
      transport: "/admin/rent-transport-ad-moderation/",
      housing: "/admin/rent-housing-ad-moderation/",
      tour: "/admin/tour-ad-moderation/",
      excursion: "/admin/excursion-ad-moderation/",
      recreation: "/admin/recreation-ad-moderation/",
    };

    return baseUrls[type];
  }

  public async getModeration(
    type: AdCategory
  ): Promise<InfoAdminAdsModeration> {
    const url = this.getModerationUrl(type);
    return await api.getWithToken<InfoAdminAdsModeration>(url);
  }

  // async getById(type: AdCategory, id: number): Promise<AdByIdModeration> {
  //   return await api.getWithToken<AdByIdModeration>(
  //     `/admin/rent-${type}-ad-moderation/${id}/`
  //   );
  // }

  async confirmModeration(applicationId: number, type: AdCategory) {
    const urlCategory = this.getModerationUrl(type);
    await api.postWithToken(`${urlCategory}${applicationId}/confirm/`);
  }

  async rejectModeration(
    applicationId: number,
    type: AdCategory,
    data: string
  ) {
    const urlCategory = this.getModerationUrl(type);
    await api.postWithToken(`${urlCategory}${applicationId}/reject/`, {
      comment: data,
    });
  }
}

export const adminAdsService = new AdminAdsService();
