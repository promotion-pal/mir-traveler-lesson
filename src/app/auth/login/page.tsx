"use client";

import { authService } from "@/features/api/site/auth";
import { CommonTextField } from "@/features/form";
import { AuthTextField } from "@/features/form/auth-fields";
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
            <AuthTextField form={form} name="email" placeholder="Email" />
          </>
        )}
      </FromWrapperAuthUi>
    </WrapperAuthUi>
  );
}
