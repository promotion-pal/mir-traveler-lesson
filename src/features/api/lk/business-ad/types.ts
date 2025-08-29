import { AdPhoto } from "../../site/ads";
import { CommonReqList } from "../../types";

interface BaseUserAds {
  id: number;
  title: string;
  text: string;
  address: string;
  transport_type: string;
  photos: AdPhoto[];
  price: string;
  views_count: number;
  feedbacks_count: number;
  favorites_count: number;
  rating: number;
  created_at: string;
}
export type UserAds = BaseUserAds;
export interface UserAdsRequest extends CommonReqList {
  results: UserAds[];
}
