interface BaseModerationAd {
  id: number;
  title: string;
  address: string;
  status: string;
}
export interface TransportModerationAd extends BaseModerationAd {
  transport_type: {};
}
export interface HouseModerationAd extends BaseModerationAd {
  housing_type: {};
}
export type ModerationAd = TransportModerationAd | HouseModerationAd;

class AdService {
  async getById() {}
}

export const adService = new AdService();
