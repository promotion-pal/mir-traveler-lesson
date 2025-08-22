"use client";

import { authService } from "@/features/api/site/auth";
import { AuthTextField } from "@/features/form";
import {
  WrapperAuthUi,
  loginFormSchema,
  useAuthFn,
  FromWrapperAuthUi,
} from "@/widgets/site/auth";

export default function LoginPage() {
  return (
    <WrapperAuthUi title="Авторизация">
      <FromWrapperAuthUi
        schema={loginFormSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={useAuthFn().api(authService.login)}
      >
        {(form) => (
          <>
            <AuthTextField form={form} name="email" placeholder="Email" />
            <AuthTextField form={form} name="password" placeholder="Пароль" />
          </>
        )}
      </FromWrapperAuthUi>
    </WrapperAuthUi>
  );
}
