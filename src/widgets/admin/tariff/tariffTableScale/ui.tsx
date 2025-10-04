"use client";

import { WrapperDialogEdits } from "@/entities/common/dialog";
import { CommonDataTable } from "@/entities/common/table";
import {
  AdminCity,
  AdminTariffScale,
  adminTariffService,
} from "@/features/api/admin/tariff";
import { CommonEmpty } from "@/shared/common/empty";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";

interface Props {
  data: AdminTariffScale[] | null;
  isLoad: boolean;
  action: (props: AdminTariffScale) => ReactNode;
}
function TariffTableScaleUi({ data, isLoad, action }: Props) {
  const tariffScaleTableColumns = [
    {
      id: "1",
      field: "category" as const,
      headerName: "Раздел",
      align: "left" as const,
    },
    {
      id: "2",
      field: "maximum" as const,
      headerName: "Максимум",
      align: "left" as const,
    },
    {
      id: "3",
      field: "constant" as const,
      headerName: "Постоянный",
      align: "center" as const,
    },
    {
      id: "4",
      field: "presence" as const,
      headerName: "Присутствие",
      align: "center" as const,
    },
    {
      id: "5",
      field: "main_widget" as const,
      headerName: "Главный виджет",
      align: "center" as const,
    },
    {
      id: "6",
      field: "section_widget" as const,
      headerName: "Виджет раздела",
      align: "center" as const,
    },
    {
      id: "7",
      field: "actions" as const,
      headerName: "Действия",
      align: "center" as const,
    },
  ];

  if (isLoad) return <Skeleton className="w-full h-20 bg-primary/10" />;
  if (!data) return <CommonEmpty />;

  return (
    <CommonDataTable
      columns={tariffScaleTableColumns}
      rows={data.map((props) => ({
        ...props,
      }))}
      renderCell={(item, type, props) => {
        switch (type) {
          case "category":
            return (
              <span className="font-medium">
                {/* {extractCategory(props.category).label} */}
              </span>
            );

          case "maximum":
            return (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {/* {extractGridTariff("maximum_start").label}: */}
                  </span>
                  <span>{props.maximum_start}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {/* {extractGridTariff("maximum_step").label}: */}
                  </span>
                  <span>{props.maximum_step}</span>
                </div>
              </div>
            );

          case "constant":
            return <span className="block text-center">{props.constant}</span>;

          case "presence":
            return <span className="block text-center">{props.presence}</span>;

          case "main_widget":
            return renderWidgetValues(props, "main_widget");

          case "section_widget":
            return renderWidgetValues(props, "section_widget");

          case "actions":
            return action(props);

          default:
            return item;
        }
      }}
    />
  );
}

const renderWidgetValues = (
  tariff: AdminTariffScale,
  widgetType: "main_widget" | "section_widget"
) => {
  const days = [1, 3, 7, 14];
  return (
    <div className="flex flex-col items-center space-y-3">
      {days.map((day) => {
        const fieldName = `${widgetType}_${day}` as keyof Omit<
          AdminTariffScale,
          "category"
        >;
        // const gridInfo = extractGridTariff(fieldName);
        return (
          <div key={day} className="flex items-center gap-1">
            {/* <span className="text-base text-gray-500">{gridInfo.label}:</span> */}
            <span className="text-base">{tariff[fieldName]}</span>
          </div>
        );
      })}
    </div>
  );
};

interface ChangeCityTariffUiProps {
  city: string;
  setCity: (city: string) => void;
  setCityId: (cityId: string) => void;
  children: ReactNode;
}

const ChangeCityTariffUi = ({
  city,
  setCity,
  setCityId,
  children,
}: ChangeCityTariffUiProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(city);
  const [cities, setCities] = useState<AdminCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(city);
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[а-яА-ЯёЁ\s-]*$/.test(value)) {
      setSearchTerm(value);
      setCity(value);

      if (value.length > 1) {
        handleCitySearch(value);
      } else {
        setCities([]);
        setIsOpen(false);
        setCityId("");
      }
    }
  };

  const handleCitySearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await adminTariffService.getCityTariff(query);
      setCities(response.results);
      setIsOpen(true);
    } catch (error) {
      console.error("Ошибка при поиске городов:", error);
      setCities([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCity = (cityData: AdminCity) => {
    setSearchTerm(cityData.title);
    setCity(cityData.title);
    setCityId(String(cityData.id));
    setIsOpen(false);
    setCities([]);
  };

  const clearSelection = () => {
    setSearchTerm("");
    setCity("");
    setCityId("");
    setCities([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          className="mt-7 w-[320px] bg-gray-100 px-3 py-4 pr-10"
          placeholder="Начните вводить город"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => cities.length > 0 && setIsOpen(true)}
        />
        {searchTerm && (
          <button
            onClick={clearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
            type="button"
          >
            ×
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute z-50 mt-2 w-[320px] rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <p className="text-center text-gray-500">Поиск...</p>
        </div>
      )}

      {isOpen && cities.length > 0 && (
        <div className="absolute z-50 mt-2 max-h-[200px] w-[320px] overflow-y-auto rounded-lg border-2 border-gray-200 bg-white shadow-lg">
          {cities.map((city) => (
            <div
              key={city.id}
              className="cursor-pointer border-t border-gray-100 px-4 py-2 transition-colors first:border-t-0 hover:bg-gray-100"
              onClick={() => handleSelectCity(city)}
            >
              <p className="font-medium">{city.title}</p>
              {city.region && (
                <p className="text-sm text-gray-500">{city.region}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {isOpen && cities.length === 0 && searchTerm.length > 1 && !isLoading && (
        <div className="absolute z-50 mt-2 w-[320px] rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg">
          <p className="text-center text-gray-500">Городы не найдены</p>
        </div>
      )}

      <div className="mt-7">{children}</div>
    </div>
  );
};

export { TariffTableScaleUi, ChangeCityTariffUi };
