"use client";

import { LkWrapper } from "@/entities/lk/wrapper";
import { CommonFrom, CommonTextField } from "@/features/form";
import { CommonFromProps } from "@/features/form/from";
import { Button } from "@/shared/ui/button";
import { ReactNode, useEffect, useState } from "react";
import { ZodType } from "zod";
import { userService } from "@/features/api/site/user";
import { useDefinitionUserFn } from "../common/definitionUser";
import { User } from "@/features/api/site/user";
import { Skeleton } from "@/shared/ui/skeleton";
import { CommonEmpty } from "@/shared/common";
import { useUserLkFn } from "./fn";
import { individualSchema } from "./schema";

interface FromUserLkUiProps<T extends ZodType>
  extends Omit<CommonFromProps<T>, "children"> {
  children: (form: Parameters<CommonFromProps<T>["children"]>[0]) => ReactNode;
}
const FromUserLkUi = <T extends ZodType>({
  children,
  ...commonFormProps
}: FromUserLkUiProps<T>) => (
  <CommonFrom {...commonFormProps}>
    {(form) => (
      <div className="space-y-4">
        {children(form)}
        {form.error && <ErrorUserLkUi error={form.error} />}
      </div>
    )}
  </CommonFrom>
);
FromUserLkUi.displayName = "FromUserLkUi";

const BtnUserLkUi = ({ disabled }: { disabled: boolean }) => (
  <div className="flex justify-end">
    <Button
      type="submit"
      disabled={disabled}
      className="rounded-full w-[200px]"
    >
      Отправить
    </Button>
  </div>
);
BtnUserLkUi.displayName = "BtnUserLkUi";

const ControlUserLkUi = ({
  status,
  onClick,
  edit,
}: {
  status: string;
  onClick: () => void;
  edit: boolean;
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <p>{status}</p>

      {edit ? (
        <Button onClick={onClick}>Отмена изменения</Button>
      ) : (
        <Button onClick={onClick}>Изменить</Button>
      )}
    </div>
  );
};
ControlUserLkUi.displayName = "ControlUserLkUi";

const ErrorUserLkUi = ({ error }: { error: string }) => (
  <div className="mt-4 rounded-lg bg-red-200 px-3 py-1 text-red-500">
    {error}
  </div>
);
ErrorUserLkUi.displayName = "ErrorUserLkUi";

const TextsUserLkUi = (props: User) => {
  const formatValue = (key: string, value: any): string => {
    const statusLabels: Record<string, string> = {
      approved: "Одобрено",
      active: "Активен",
      individual: "Физическое лицо",
    };

    if (statusLabels[value]) {
    }

    return value?.toString() || "";
  };

  return Object.entries(props).map(([key, value]) => {
    if (typeof value === "object" && value !== null) return null;
    if (key === "id") return null;

    const labels: Record<string, string> = {
      email: "Email",
      first_name: "Имя",
      last_name: "Фамилия",
      middle_name: "Отчество",
      phone: "Телефон",
      moderation_status: "Статус модерации",
      role: "Роль",
      status: "Статус",
    };

    const formattedValue = formatValue(key, value);

    return (
      <div key={key}>
        <p>{labels[key] || key}</p>
        <p>{formattedValue}</p>
      </div>
    );
  });
};
TextsUserLkUi.displayName = "TextsUserLkUi";

const ClientUserLkUi = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user } = useDefinitionUserFn();
  const { edit, toggleEdit } = useUserLkFn();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      if (!user) return;

      try {
        const userReq = await userService.get(user.id);
        setProfile(userReq);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (isLoading)
    return (
      <LkWrapper title="Мои данные">
        <Skeleton className="w-full bg-amber-100 h-36" />
      </LkWrapper>
    );
  if (!profile) return <CommonEmpty />;

  return (
    <FromUserLkUi
      schema={individualSchema}
      defaultValues={{
        email: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        change_email: false,
        physical_address: {
          full_address: "",
        },
        // business_info: {
        //   contact_person_phone: "",
        //   organization_type: "ip" as const,
        //   full_legal_name: "",
        //   manager_full_name: "",
        //   manager_post: "general_manager" as const,
        //   inn: "",
        //   kpp: "",
        //   current_account: "",
        //   correspondent_account: "",
        //   bic: "",
        //   ogrn_ip: "",
        //   contact_person_name: "",
        //   contact_person_surname: "",
        //   contact_person_middle_name: "",
        //   contact_person_email: "",
        // },
      }}
      onSubmit={async (data) => {
        await userService.update(profile.id, data);
      }}
      data={profile}
    >
      {(form) => (
        <>
          <LkWrapper title="Мои данные" styleWrapper="space-y-5 mb-8">
            <ControlUserLkUi
              onClick={toggleEdit}
              edit={edit}
              status={profile.status}
            />

            <div className="grid md:grid-cols-3 gap-5">
              {edit ? (
                <>
                  <CommonTextField form={form} name="first_name" label="Имя" />
                  <CommonTextField
                    form={form}
                    name="middle_name"
                    label="Отчество"
                  />
                  <CommonTextField
                    form={form}
                    name="last_name"
                    label="Фамилия"
                  />
                  <CommonTextField
                    form={form}
                    name="email"
                    label="Email"
                    isDisable={true}
                  />
                  <CommonTextField form={form} name="phone" label="Телефон" />
                  <CommonTextField
                    form={form}
                    name="physical_address.full_address"
                    label="Полный адрес"
                  />
                </>
              ) : (
                <TextsUserLkUi {...profile} />
              )}
            </div>

            <BtnUserLkUi disabled={form.isSubmitting} />
          </LkWrapper>

          {/* {profile.role === "business" && (
            <LkWrapper title="Бизнес информация" styleWrapper="space-y-5 mb-8">
              <div className="grid md:grid-cols-3 gap-5">
                {edit ? (
                  <>
                    <CommonTextField
                      form={form}
                      name="legal_address.full_address"
                      label="Полный адрес"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.inn"
                      label="ИНН"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.kpp"
                      label="КПП"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.ogrn_ip"
                      label="ОГРН/ОГРНИП"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.bic"
                      label="БИК"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.current_account"
                      label="Расчетный счет"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.correspondent_account"
                      label="Корреспондентский счет"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.full_legal_name"
                      label="Полное наименование организации"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.manager_full_name"
                      label="ФИО руководителя"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.contact_person_name"
                      label="Имя контактного лица"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.contact_person_surname"
                      label="Фамилия контактного лица"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.contact_person_middle_name"
                      label="Отчество контактного лица"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.contact_person_phone"
                      label="Телефон контактного лица"
                    />
                    <CommonTextField
                      form={form}
                      name="business_info.contact_person_email"
                      label="Email контактного лица"
                    />
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </LkWrapper>
          )} */}
        </>
      )}
    </FromUserLkUi>
  );
};

export { ClientUserLkUi, FromUserLkUi, BtnUserLkUi };
