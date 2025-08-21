"use client";

import { authService } from "@/features/api/site/auth";
import { CommonTextField } from "@/features/form";
import { AuthTextField } from "@/features/form/auth-fields";
import {
  WrapperAuthUi,
  useAuthFn,
  FromWrapperAuthUi,
  registerFormSchema,
} from "@/widgets/site/auth";

export default function LoginPage() {
  return (
    <WrapperAuthUi title="Авторизация">
      <FromWrapperAuthUi
        schema={registerFormSchema}
        defaultValues={{
          email: "",
          password: "",
          password_2: "",
          role: "",
          is_privacy_policy_confirmed: true,
        }}
        onSubmit={useAuthFn().api(authService.login)}
      >
        {(form) => (
          <>
            <AuthTextField form={form} name="email" placeholder="Email" />
            <AuthTextField form={form} name="password" placeholder="Пароль" />
            <AuthTextField
              form={form}
              name="password_2"
              placeholder="Повторный пароль"
            />
          </>
        )}
      </FromWrapperAuthUi>
    </WrapperAuthUi>
  );
}
