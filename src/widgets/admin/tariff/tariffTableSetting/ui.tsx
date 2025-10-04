"use client";

import { WrapperDialogEdits } from "@/entities/common/dialog";
import { CommonDataTable } from "@/entities/common/table";
import { adminTariffService, AdminTariff } from "@/features/api/admin/tariff";
import { CommonTextField } from "@/features/form/fields";
import { CommonEmpty } from "@/shared/common";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, useState } from "react";
import { z } from "zod";

export function TariffTableSettingUi({
  data,
  isLoad,
  trigger,
}: {
  data: AdminTariff[] | null;
  isLoad: boolean;
  trigger: () => void;
}) {
  if (isLoad) return <Skeleton className="w-full h-20 bg-primary/10" />;
  if (!data) return <CommonEmpty />;

  const tariffTableSettings = [
    {
      id: "1",
      field: "mode" as const,
      headerName: "Тип тарифа",
      align: "center" as const,
    },
    {
      id: "2",
      field: "title" as const,
      headerName: "Тарифы",
      align: "center" as const,
    },
    {
      id: "3",
      field: "place_limit" as const,
      headerName: "Мак. кол-во мест",
      align: "center" as const,
    },
    {
      id: "4",
      field: "description" as const,
      headerName: "Описание",
      align: "center" as const,
    },
    {
      id: "5",
      field: "max_price" as const,
      headerName: "Максимальная стоимость, сутки, Р",
      align: "center" as const,
    },
    {
      id: "6",
      field: "is_active" as const,
      headerName: "Статус",
      align: "center" as const,
    },
    {
      id: "7",
      field: "actions" as const,
      headerName: "Действия",
      align: "center" as const,
    },
  ];

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Название должно содержать минимум 2 символа",
    }),
    description: z.string().min(10, {
      message: "Описание должно содержать минимум 10 символов",
    }),
    place_limit: z.coerce.number().min(0).max(2147483647),
    is_active: z.boolean(),
    max_price: z.coerce.number().min(0).max(2147483647),
  });

  return (
    <CommonDataTable
      className="w-full"
      columns={tariffTableSettings}
      rows={data.map((props) => ({
        ID: props.id,
        ...props,
      }))}
      renderCell={(item, type, props) => {
        switch (type) {
          // case 'mode':
          //   return <p>{extractModeTariff(props.mode).label}</p>;

          case "is_active":
            return <DifStatus status={props.is_active} />;

          case "actions":
            return (
              <WrapperDialogEdits
                title="Редактирование тарифной сетки по умолчанию"
                schema={formSchema}
                defaultValues={{
                  title: "Привет",
                  description: "рораовро",
                  place_limit: 4,
                  is_active: true,
                  max_price: 2,
                }}
                data={props}
                onSubmit={async (data) => {
                  await adminTariffService.updateGeneralSettings(
                    props.id,
                    data
                  );
                  trigger();
                }}
              >
                {(form) => (
                  <section className="grid gap-4 md:grid-cols-2">
                    <CommonTextField
                      form={form}
                      name="title"
                      label="Заголовок"
                      inputVariant="tariff"
                      variant="tariff"
                    />

                    <CommonTextField
                      form={form}
                      name="description"
                      label="Описание"
                      inputVariant="tariff"
                      variant="tariff"
                    />

                    <CommonTextField
                      form={form}
                      name="max_price"
                      label="Макс. стоимость"
                      inputVariant="tariff"
                      variant="tariff"
                    />

                    <CommonTextField
                      form={form}
                      name="place_limit"
                      label="Описание"
                      inputVariant="tariff"
                      variant="tariff"
                    />
                  </section>
                )}
              </WrapperDialogEdits>
            );
          default:
            return item;
        }
      }}
    />
  );
}

const DifStatus = ({ status }: { status: boolean }) => {
  return <p className="text-center">{status ? "Активен" : "Не активен"}</p>;
};
