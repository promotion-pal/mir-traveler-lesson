"use client";

import { CommonFrom } from "@/features/form";
import { CommonTextField } from "@/features/form/fields";
import { useBearStore } from "@/features/store";
import { Button } from "@/shared/ui/button";
import { WrapperAuthUi, LineAuthUi, DocAuthUi } from "@/widgets/site/auth";
import { BtnAuthUi } from "@/widgets/site/auth/ui";
import z from "zod";

export default function LoginPage() {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  return (
    <WrapperAuthUi title="Авторизация">
      <CommonFrom
        schema={loginSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={async () => {}}
      >
        {(form) => (
          <div className="space-y-5 mt-6">
            <CommonTextField form={form} name="email" placeholder="Email" />
            <CommonTextField form={form} name="password" placeholder="Пароль" />

            <BtnAuthUi action="Войти" />
          </div>
        )}
      </CommonFrom>

      <LineAuthUi />
      <DocAuthUi />
    </WrapperAuthUi>
  );
}
