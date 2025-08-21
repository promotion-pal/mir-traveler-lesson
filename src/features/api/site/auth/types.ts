export interface Login {
  access_token: string;
  refresh_token: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenData {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_2: string;
  role: string;
  is_privacy_policy_confirmed: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface NewPasswordRequest {
  user_id: string | undefined;
  password: string;
  password_2: string;
}

export type SessionPayload = {
  access_token: string;
  refresh_token: string;
  id?: string;
  role?: string;
};
