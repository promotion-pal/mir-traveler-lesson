import { getTokens, removeTokens, setToken } from "@/features/data/token";
import { ROUTE } from "@/shared/config/path";
import { redirect } from "next/navigation";
import { api } from "../fetch";
import {
  LoginPOST,
  NewPasswordPOST,
  RegisterPOST,
  ResetPOST,
  TokensBackGET,
} from "./types";

class AuthService {
  private refreshTimer: NodeJS.Timeout | null = null;
  private isRefreshing = false;

  private readonly ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
  private readonly REFRESH_THRESHOLD = 1 * 60 * 1000;

  login = async (form: LoginPOST) => {
    try {
      const tokens = await api.post<TokensBackGET>("/site/auth/login/", form);
      if (tokens) {
        await setToken({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        });

        this.startRefreshTimer();
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  async register(form: RegisterPOST) {
    try {
      const response = await api.post("/site/auth/register/", form);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(data: ResetPOST) {
    try {
      const response = await api.post("/site/auth/reset_password/", data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async newPassword(data: NewPasswordPOST) {
    try {
      const response = await api.post("/site/auth/reset_password_done/", data);
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout = async () => {
    this.clearTimer();
    await removeTokens();
    redirect(ROUTE.SITE.MAIN);
  };

  async refreshToken(refresh_token: string): Promise<TokensBackGET> {
    return await api.post("/site/auth/refresh_token/", {
      refresh_token: refresh_token,
    });
  }

  updateTokens = async (refresh_token: string) => {
    try {
      const tokens = await this.refreshToken(refresh_token);

      if (!tokens) throw new Error("Tokens not found");

      await setToken({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });

      this.startRefreshTimer();
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  };

  private startRefreshTimer = (
    expiresInMs: number = this.ACCESS_TOKEN_EXPIRY
  ) => {
    this.clearTimer();

    const refreshTime = expiresInMs - this.REFRESH_THRESHOLD;

    console.log(`Токен будет обновлен через ${refreshTime / 1000} секунд`);

    this.refreshTimer = setTimeout(async () => {
      try {
        await this.attemptTokenRefresh();
      } catch (error) {
        console.error("Automatic token refresh failed:", error);
        this.clearTimer();
      }
    }, refreshTime);
  };

  private clearTimer = () => {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  };

  private attemptTokenRefresh = async () => {
    if (this.isRefreshing) return;

    this.isRefreshing = true;
    try {
      const tokens = await getTokens();
      if (!tokens?.refreshToken) {
        throw new Error("No refresh token available");
      }

      const newTokens = await this.refreshToken(tokens.refreshToken);

      if (newTokens) {
        await setToken({
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token,
        });

        this.startRefreshTimer();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await this.logout();
    } finally {
      this.isRefreshing = false;
    }
  };
}

export const authService = new AuthService();
