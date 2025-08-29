import { api } from "../../fetch";
import { Person, User, UserNotificationList } from "./types";

class UserService {
  async getMe({ withToken = false }: { withToken: boolean }): Promise<Person> {
    if (withToken) return await api.getWithToken<Person>("/site/me/");
    return await api.get("/site/me/");
  }

  async getNotifications(): Promise<UserNotificationList> {
    return await api.getWithToken<UserNotificationList>("/site/notifications/");
  }

  async get(userId: number): Promise<User> {
    return await api.getWithToken<User>(`/site/users/${userId}/`);
  }

  async update(userId: number, data: User): Promise<User> {
    return await api.putWithToken<User>(`/site/users/${userId}/`, data);
  }

  async sendModeration() {
    return await api.postWithToken("/site/users/send_for_moderation/");
  }

  async changeRole() {
    return await api.postWithToken("/site/users/change_role/");
  }

  async getFavorites() {
    return await api.getWithToken("/site/favorites/");
  }
}

export const userService = new UserService();
