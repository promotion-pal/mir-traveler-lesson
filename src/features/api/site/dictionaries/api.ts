import { api } from "../../fetch";
import { AdCategory } from "../ads";
import { DictionariesOptionType, DictionariesType } from "./types";

class DictionariesService {
  // private getAdOptionUrl: Record<
  //   Extract<AdCategory, "transport" | "housing">,
  //   string
  // > = {
  //   transport: "",
  //   housing: "",
  // };

  async getCity() {
    return api.get("/site/dictionaries/cities/");
  }

  async getAdType(category: AdCategory): Promise<DictionariesType[]> {
    return await api.get<DictionariesType[]>(
      `/site/dictionaries/${category}-type/`
    );
  }

  async getOptions(
    option: DictionariesOptionType
  ): Promise<DictionariesType[]> {
    return await api.get<DictionariesType[]>(`/site/dictionaries/${option}/`);
  }
}

export const dictionariesService = new DictionariesService();
