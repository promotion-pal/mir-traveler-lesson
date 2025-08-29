import { AdCategory } from "../../site/ads";
import { CommonReqList } from "../../types";

export type AdminTariffCategory = "scaleDefault" | "scaleByCity" | "default";

export interface AdminTariff {
  id: number;
  // mode: ModeAdminTarif;
  title: string;
  description: string;
  place_limit: number;
  is_active: boolean;
  max_price: number;
}
export interface UpdateAdminTariff {
  title: string;
  description: string;
  place_limit: number;
  is_active: boolean;
  max_price: number;
}

export interface AdminTariffScale {
  id: number;
  category: AdCategory;
  constant: number;
  main_widget_1: number;
  main_widget_3: number;
  main_widget_7: number;
  main_widget_14: number;
  maximum_start: number;
  maximum_step: number;
  presence: number;
  section_widget_1: number;
  section_widget_3: number;
  section_widget_7: number;
  section_widget_14: number;
}
export interface UpdateAdminScaleDefault {
  category_scales: [
    {
      category: AdCategory;
      scales: Omit<AdminTariffScale, "category" | "id">;
    }
  ];
}

export interface AdminTariffScaleByCity {
  category_scales: {
    category: AdCategory;
    id: number;
    scales: Omit<AdminTariffScale, "id" | "category">;
  }[];
  id: number;
  region: string;
  title: string;
}

export interface AdminCity {
  id: number;
  title: string;
  region: string;
  latitude: string;
  longitude: string;
}
export interface AdminCityTariff extends CommonReqList {
  results: AdminCity[];
}
