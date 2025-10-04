import { ur } from "zod/v4/locales";
import { api } from "../../fetch";
import {
  AdminCityTariff,
  AdminTariff,
  AdminTariffScale,
  AdminTariffScaleByCity,
  UpdateAdminScaleDefault,
  UpdateAdminTariff,
} from "./types";

class AdminTariffService {
  async getCityTariff(city: string): Promise<AdminCityTariff> {
    return api.getWithToken<AdminCityTariff>(
      `/admin/dictionaries/cities/?search=${city}`
    );
  }

  async updateGeneralSettings(id: number, newTariff: UpdateAdminTariff) {
    return await api.putWithToken(`/admin/tariffs/${id}/`, newTariff);
  }

  async updateDefaultScale(id: number, newTariff: UpdateAdminScaleDefault) {
    return await api.putWithToken(
      `/admin/tariff-configurations/${id}/`,
      newTariff
    );
  }

  async updateDefaultScaleByCity(
    cityId: number,
    newTariff: UpdateAdminScaleDefault
  ) {
    return await api.putWithToken(`/admin/tariff-scale/${cityId}/`, newTariff);
  }

  async get(): Promise<AdminTariff[]> {
    return await api.getWithToken<AdminTariff[]>("/admin/tariffs");
  }

  async getScale(): Promise<AdminTariffScale[]> {
    return await api.getWithToken<AdminTariffScale[]>(
      "/admin/tariff-configurations/"
    );
  }

  async getScaleByCityId(cityId: number): Promise<AdminTariffScaleByCity> {
    return await api.getWithToken<AdminTariffScaleByCity>(
      `/admin/tariff-scale/${cityId}/`
    );
  }
}

export const adminTariffService = new AdminTariffService();
