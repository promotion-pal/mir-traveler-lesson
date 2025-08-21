import { CommonFrom } from "@/features/form";
import { CommonFromProps } from "@/features/form/from";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";
import { ZodType } from "zod";

interface WrapperAuthUiProps {
  title: string;
  children: ReactNode;
}
function WrapperAuthUi({ title, children }: WrapperAuthUiProps) {
  return (
    <section>
      <p className="mb-8 text-center text-lg font-semibold uppercase text-primary">
        {title}
      </p>
      {children}

      <div className="mt-6 h-[2px] w-full rounded-full bg-gray-300" />

      <AgreeInfoAuthUi />
    </section>
  );
}
WrapperAuthUi.displayName = "WrapperAuthUi";

const BtnAuthUi = ({
  action,
  disabled,
}: {
  action: string;
  disabled: boolean;
}) => (
  <Button
    variant="default"
    disabled={disabled}
    type="submit"
    className="w-full"
  >
    {action}
  </Button>
);
BtnAuthUi.displayName = "BtnAuthUi";

interface FromWrapperAuthUiProps<T extends ZodType>
  extends Omit<CommonFromProps<T>, "children"> {
  children: (form: Parameters<CommonFromProps<T>["children"]>[0]) => ReactNode;
}

const FromWrapperAuthUi = <T extends ZodType>({
  children,
  ...commonFormProps
}: FromWrapperAuthUiProps<T>) => (
  <CommonFrom {...commonFormProps}>
    {(form) => (
      <div className="space-y-4 mt-8">
        {children(form)}
        {form.error && <ErrorAuthUi error={form.error} />}
        <BtnAuthUi action="Войти" disabled={form.isSubmitting} />
      </div>
    )}
  </CommonFrom>
);
FromWrapperAuthUi.displayName = "FromWrapperAuthUi";

const AgreeInfoAuthUi = () => (
  <p className="mt-6 text-sm text-black">
    Авторизуясь, вы соглашаетесь c{" "}
    <Link className="underline" href={""}>
      обработкой персональных данных
    </Link>{" "}
    и{" "}
    <Link className="underline" href="">
      условиями пользовательских соглашений
    </Link>
  </p>
);
AgreeInfoAuthUi.displayName = "AgreeInfoAuthUi";

const ErrorAuthUi = ({ error }: { error: string }) => (
  <div className="mt-4 rounded-lg bg-red-200 px-3 py-1 text-red-500">
    {error}
  </div>
);
ErrorAuthUi.displayName = "ErrorAuthUi";

export {
  WrapperAuthUi,
  BtnAuthUi,
  FromWrapperAuthUi,
  AgreeInfoAuthUi,
  ErrorAuthUi,
};
