import { CommonReqList } from "../../types";

export type ModerationAdType =
  | "user"
  | "rent-housing-ad"
  | "rent-transport-ad"
  | "tour-ad"
  | "recreation-ad";

export interface InfoAdminAdsModeration extends CommonReqList {
  results: AdminAdsModeration[];
}
export type AdminAdsModeration =
  | TransportAdminAdsModeration
  | HouseAdminAdsModeration;
interface BaseAdminAdsModeration {
  id: number;
  // employee: EmployeeModeration;
  // ad: DictionariesAdType;
  created_at: string;
  updated_at: Date;
  is_active: boolean;
  is_approved: boolean;
}
interface TransportAdminAdsModeration extends BaseAdminAdsModeration {}
interface HouseAdminAdsModeration extends BaseAdminAdsModeration {}
