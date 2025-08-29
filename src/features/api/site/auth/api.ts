import { removeTokens, setToken } from "@/features/data/token";
import { Login } from "./types";
import { api } from "../../fetch";
import { redirect } from "next/navigation";
import { ROUTE } from "@/shared/config/path";

class AuthService {
  async login(form: Login) {
    const tokens = await api.post<TokensRespons>("/site/auth/login/", form);
    if (tokens) {
      setToken({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
    }
  }

  async register(data: RegisterRequest) {
    try {
      const response = await api.post("/site/auth/register/", data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordRequest) {
    try {
      const response = await api.post("/site/auth/reset_password/", data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async newPassword(data: NewPasswordRequest) {
    try {
      const response = await api.post("/site/auth/reset_password_done/", data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await removeTokens();
    redirect(ROUTE.SITE.MAIN);
  }
}

export const authService = new AuthService();
