import { api } from "../../fetch";
import { Person } from "./types";

class UserService {
  async getMe({ withToken = false }: { withToken: boolean }): Promise<Person> {
    if (withToken) return await api.getWithToken<Person>("/site/me/");
    return await api.get("/site/me/");
  }
}

export const userService = new UserService();
