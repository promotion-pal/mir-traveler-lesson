class BusinessAdService {
  private getModerationUrl(type: AdCategory): string {
    const baseUrls: Record<AdCategory, string> = {
      main: "/site/ads/business-housing/",
      transport: "/admin/rent-transport-ad-moderation/",
      housing: "/admin/rent-housing-ad-moderation/",
      tour: "/admin/tour-ad-moderation/",
      excursion: "/admin/excursion-ad-moderation/",
      recreation: "/admin/recreation-ad-moderation/",
    };

    return baseUrls[type];
  }

  public async checkAddressDuplicates(type: AdCategory, address: string) {
    const url = this.getModerationUrl(type);
    return await api.postWithToken(url + "check_address_duplicates/", {
      address: address,
    });
  }

  async checkText(string: string) {
    return api.postWithToken<string>("/site/ads/check_text", { title: string });
  }
}

export const businessAdService = new BusinessAdService();
