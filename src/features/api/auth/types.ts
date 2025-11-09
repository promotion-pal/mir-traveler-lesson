import { z } from "zod";

export type AuthAction =
  | "login"
  | "register"
  | "new-password"
  | "reset-password";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Пароль обязательный" }),
});
type LoginPOST = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Пароль обязательный" }),
  password_2: z.string().min(1, { message: "Пароль обязательный" }),
  role: z.string().min(1, { message: "Логин обязательно" }),
  is_privacy_policy_confirmed: z
    .boolean()
    .refine(
      (val) => val === true,
      "Для продолжения подтвердите пожалуйста политику конфиденциальности"
    ),
});
type RegisterPOST = z.infer<typeof registerSchema>;

const resetSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
});
type ResetPOST = z.infer<typeof resetSchema>;

const newPasswordSchema = z.object({
  user_id: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Логин обязательно" }),
  password_2: z.string().min(1, { message: "Логин обязательно" }),
});
type NewPasswordPOST = z.infer<typeof newPasswordSchema>;

export interface TokensBackGET {
  access_token: string;
  refresh_token: string;
}
export interface TokensCookie {
  accessToken: string;
  refreshToken: string;
}
export interface TokensCookieOption {
  accessToken?: string;
  refreshToken?: string;
}

export {
  loginSchema,
  newPasswordSchema,
  registerSchema,
  resetSchema,
  type LoginPOST,
  type NewPasswordPOST,
  type RegisterPOST,
  type ResetPOST,
};
