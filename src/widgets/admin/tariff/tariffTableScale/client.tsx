"use client";

import {
  AdminTariff,
  AdminTariffScale,
  adminTariffService,
} from "@/features/api/admin/tariff";
import { useEffect, useState } from "react";
import { ChangeCityTariffUi, TariffTableScaleUi } from "./ui";
import { TariffTableSettingUi } from "../tariffTableSetting";
import { WrapperDialogEdits } from "@/entities/common/dialog";
import z from "zod";
import { CommonTextField } from "@/features/form";

const ClientTariffTableSetting = () => {
  const [tariff, setTariff] = useState<AdminTariff[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const trigger = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    setIsLoading(true);

    adminTariffService
      .get()
      .then(setTariff)
      .catch((error) => setTariff(null))
      .finally(() => setIsLoading(false));
  }, [refreshTrigger]);

  return (
    <TariffTableSettingUi trigger={trigger} data={tariff} isLoad={isLoading} />
  );
};

const formSchema = z.object({
  maximum_start: z.coerce.number().min(0),
  maximum_step: z.coerce.number().min(0),
  constant: z.coerce.number().min(0),
  presence: z.coerce.number().min(0),
  main_widget_1: z.coerce.number().min(0),
  main_widget_3: z.coerce.number().min(0),
  main_widget_7: z.coerce.number().min(0),
  main_widget_14: z.coerce.number().min(0),
  section_widget_1: z.coerce.number().min(0),
  section_widget_3: z.coerce.number().min(0),
  section_widget_7: z.coerce.number().min(0),
  section_widget_14: z.coerce.number().min(0),
});

const ClientTariffTableScale = () => {
  const [tariff, setTariff] = useState<AdminTariffScale[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const trigger = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    adminTariffService
      .getScale()
      .then(setTariff)
      .catch(() => setTariff(null))
      .finally(() => setIsLoading(false));
  }, [refreshTrigger]);

  return (
    <TariffTableScaleUi
      data={tariff}
      isLoad={isLoading}
      action={(props) => {
        return (
          <WrapperDialogEdits
            title={`Настройка тарифной сетки по умолчанию (${props.category})`}
            schema={formSchema}
            defaultValues={{
              constant: 1,
              presence: 1,
              main_widget_1: 1,
              main_widget_14: 1,
              main_widget_3: 1,
              main_widget_7: 1,
              maximum_start: 1,
              maximum_step: 1,
              section_widget_1: 1,
              section_widget_14: 1,
              section_widget_7: 1,
              section_widget_3: 1,
            }}
            data={props}
            onSubmit={async (data) => {
              await adminTariffService.updateDefaultScale(props.id, {
                category_scales: [
                  {
                    category: props.category,
                    scales: {
                      ...data,
                    },
                  },
                ],
              });

              trigger();
            }}
          >
            {(form) => (
              <section className="grid grid-cols-4 gap-5">
                <CommonTextField
                  form={form}
                  name="presence"
                  label="Присутствие"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="constant"
                  label="Постоянный"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="maximum_start"
                  label="Максимальный старт"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="maximum_step"
                  label="Максимальный шаг"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="main_widget_1"
                  label="Главный виджет (1 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="main_widget_3"
                  label="Главный виджет (3 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="main_widget_7"
                  label="Главный виджет (7 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="main_widget_14"
                  label="Главный виджет (14 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="section_widget_1"
                  label="Секционный виджет (1 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="section_widget_3"
                  label="Секционный виджет (3 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="section_widget_7"
                  label="Секционный виджет (7 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />

                <CommonTextField
                  form={form}
                  name="section_widget_14"
                  label="Секционный виджет (14 день)"
                  inputVariant="tariff"
                  variant="tariff"
                />
              </section>
            )}
          </WrapperDialogEdits>
        );
      }}
    />
  );
};

const ClientTariffTableScaleByCity = () => {
  const [tariff, setTariff] = useState<AdminTariffScale[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [cityId, setCityId] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState("");

  const trigger = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    adminTariffService
      .getScaleByCityId(Number(cityId))
      .then((res) => {
        const scales: AdminTariffScale[] =
          res.category_scales?.map((item) => {
            return {
              id: item.id,
              category: item.category,
              ...item.scales,
            };
          }) || [];

        setTariff(scales);
      })
      .catch(() => setTariff(null))
      .finally(() => setIsLoading(false));
  }, [refreshTrigger, cityId]);

  return (
    <ChangeCityTariffUi
      city={selectedCity}
      setCity={setSelectedCity}
      setCityId={setCityId}
    >
      <TariffTableScaleUi
        action={(props) => {
          return (
            <WrapperDialogEdits
              title={`Настройка тарифной сетки по умолчанию (${props.category})`}
              schema={formSchema}
              defaultValues={{
                constant: 1,
                presence: 1,
                main_widget_1: 1,
                main_widget_14: 1,
                main_widget_3: 1,
                main_widget_7: 1,
                maximum_start: 1,
                maximum_step: 1,
                section_widget_1: 1,
                section_widget_14: 1,
                section_widget_7: 1,
                section_widget_3: 1,
              }}
              data={props}
              onSubmit={async (data) => {
                await adminTariffService.updateDefaultScaleByCity(
                  Number(cityId),
                  {
                    category_scales: [
                      {
                        category: props.category,
                        scales: {
                          ...data,
                        },
                      },
                    ],
                  }
                );

                trigger();
              }}
            >
              {(form) => (
                <section className="grid grid-cols-4 gap-5">
                  <CommonTextField
                    form={form}
                    name="presence"
                    label="Присутствие"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="constant"
                    label="Постоянный"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="maximum_start"
                    label="Максимальный старт"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="maximum_step"
                    label="Максимальный шаг"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="main_widget_1"
                    label="Главный виджет (1 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="main_widget_3"
                    label="Главный виджет (3 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="main_widget_7"
                    label="Главный виджет (7 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="main_widget_14"
                    label="Главный виджет (14 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="section_widget_1"
                    label="Секционный виджет (1 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="section_widget_3"
                    label="Секционный виджет (3 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="section_widget_7"
                    label="Секционный виджет (7 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />

                  <CommonTextField
                    form={form}
                    name="section_widget_14"
                    label="Секционный виджет (14 день)"
                    inputVariant="tariff"
                    variant="tariff"
                  />
                </section>
              )}
            </WrapperDialogEdits>
          );
        }}
        data={tariff}
        isLoad={isLoading}
      />
    </ChangeCityTariffUi>
  );
};

export {
  ClientTariffTableScale,
  ClientTariffTableScaleByCity,
  ClientTariffTableSetting,
};
