import { RegisterRequest } from "@/features/api/site/auth";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Пароль обязательный" }),
});

const registerFormSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Пароль обязательный" }),
  password_2: z.string().min(1, { message: "Пароль обязательный" }),
  role: z.string().min(1, { message: "Логин обязательно" }),
  is_privacy_policy_confirmed: z.literal(true, {
    errorMap: () => ({
      message: "Вы должны подтвердить политику конфиденциальности",
    }),
  }),
}) satisfies z.ZodType<RegisterRequest>;

const resetFormSchema = z.object({
  email: z.string().min(1, { message: "Логин обязательно" }),
});

const newPasswordFormSchema = z.object({
  user_id: z.string().min(1, { message: "Логин обязательно" }),
  password: z.string().min(1, { message: "Логин обязательно" }),
  password_2: z.string().min(1, { message: "Логин обязательно" }),
});

export {
  loginFormSchema,
  newPasswordFormSchema,
  registerFormSchema,
  resetFormSchema,
};
