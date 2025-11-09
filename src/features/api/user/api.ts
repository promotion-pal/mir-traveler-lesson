import { api } from "../fetch";
import { Me } from "./types";

class UserService {
  async me(): Promise<Me> {
    return await api.get<Me>("/site/me/");
  }
}

export const userService = new UserService();
