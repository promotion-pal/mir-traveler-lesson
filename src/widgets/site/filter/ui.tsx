"use client";

import { AdCategory } from "@/features/api/site/ads";
import {
  DictionariesOptionType,
  dictionariesService,
  DictionariesType,
} from "@/features/api/site/dictionaries";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, useState } from "react";

interface FilterItem {
  title: string;
  list: DictionariesType[];
}

interface FilterMainAdUiProps {
  checkbox: FilterItem | null;
  option: FilterItem | null;
  isLoad: boolean;
  selectedCheckbox: string[];
  selectedOptions: string[];
  onCheckboxChange: (id: string, checked: boolean) => void;
  onOptionChange: (id: string, checked: boolean) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterMainAdUi = ({
  checkbox,
  option,
  isLoad,
  selectedCheckbox,
  selectedOptions,
  onCheckboxChange,
  onOptionChange,
  onApply,
  onReset,
}: FilterMainAdUiProps) => {
  if (isLoad) return <Skeleton className="bg-gray-50 w-full h-20" />;

  const hasSelectedFilters =
    selectedCheckbox.length > 0 || selectedOptions.length > 0;

  return (
    <div
      className="h-fit w-full rounded-xl bg-gray-50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      data-testid="filter-section"
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl">Фильтр</p>
        {hasSelectedFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            Сбросить
          </Button>
        )}
      </div>

      {checkbox && (
        <div className="space-y-2 mt-5">
          <p className="mb-4 font-semibold">{checkbox.title}</p>
          {checkbox.list.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`checkbox-${item.id}`}
                checked={selectedCheckbox.includes(String(item.id))}
                onCheckedChange={(checked) =>
                  onCheckboxChange(String(item.id), checked as boolean)
                }
              />
              <Label htmlFor={`checkbox-${item.id}`}>{item.title}</Label>
            </div>
          ))}
        </div>
      )}

      {option && (
        <div className="space-y-2 mt-5">
          <p className="mb-4 font-semibold">{option.title}</p>
          {option.list.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${item.id}`}
                checked={selectedOptions.includes(String(item.id))}
                onCheckedChange={(checked) =>
                  onOptionChange(String(item.id), checked as boolean)
                }
              />
              <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-7">
        <Button onClick={onApply} className="flex-1">
          Применить
        </Button>
        {hasSelectedFilters && (
          <Button variant="outline" onClick={onReset} className="flex-1">
            Сбросить
          </Button>
        )}
      </div>
    </div>
  );
};

const ClientFilterMainAd = ({
  category,
  setQueryParams,
}: {
  category: AdCategory;
  setQueryParams: (key: string, value: string | number) => void;
}) => {
  interface Filter {
    checkbox: {
      title: string;
      query: string;
    };
    option?: {
      title: string;
      api: DictionariesOptionType;
    };
  }

  const transformType: Record<AdCategory, Filter> = {
    housing: {
      checkbox: {
        title: "Тип жилья",
        query: "housing_type",
      },
      option: { title: "Удобства", api: "comfort-items" },
    },
    transport: {
      checkbox: {
        title: "Тип транспорта",
        query: "transport_type",
      },
      option: { title: "Опции", api: "transport-options" },
    },
    tour: {
      checkbox: {
        title: "Тип тура",
        query: "tour_type",
      },
    },
    recreation: {
      checkbox: {
        title: "Тип отдыха",
        query: "recreation_type",
      },
    },
    excursion: {
      checkbox: {
        title: "Тип экскурсии",
        query: "excursion_type",
      },
    },
  };

  const [checkbox, setCheckbox] = useState<FilterItem | null>(null);
  const [options, setOptions] = useState<FilterItem | null>(null);
  const [isLoad, setLoad] = useState<boolean>(true);

  // Состояния для отслеживания выбранных значений
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Списки доступных ID для проверки
  const [availableCheckboxIds, setAvailableCheckboxIds] = useState<string[]>(
    []
  );
  const [availableOptionIds, setAvailableOptionIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [checkboxResponse, optionsResponse] = await Promise.all([
          dictionariesService.getAdType(category),
          transformType[category].option
            ? dictionariesService.getOptions(
                transformType[category].option!.api
              )
            : Promise.resolve(null),
        ]);

        setCheckbox({
          title: transformType[category].checkbox.title,
          list: checkboxResponse,
        });

        // Сохраняем доступные ID checkbox
        setAvailableCheckboxIds(
          checkboxResponse.map((item) => String(item.id))
        );

        if (transformType[category].option && optionsResponse) {
          setOptions({
            title: transformType[category].option!.title,
            list: optionsResponse,
          });
          // Сохраняем доступные ID options
          setAvailableOptionIds(optionsResponse.map((item) => String(item.id)));
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, [category]);

  // Обработчики изменений чекбоксов с проверкой существования ID
  const handleCheckboxChange = (id: string, checked: boolean) => {
    // Проверяем, что ID существует в доступных вариантах
    if (!availableCheckboxIds.includes(id)) {
      console.warn(`ID ${id} не найден в доступных checkbox вариантах`);
      return;
    }

    setSelectedCheckbox((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleOptionChange = (id: string, checked: boolean) => {
    // Проверяем, что ID существует в доступных вариантах
    if (!availableOptionIds.includes(id)) {
      console.warn(`ID ${id} не найден в доступных option вариантах`);
      return;
    }

    setSelectedOptions((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  // Функция сброса фильтров
  const resetFilters = () => {
    setSelectedCheckbox([]);
    setSelectedOptions([]);

    // Сбрасываем параметры в URL
    setQueryParams(transformType[category].checkbox.query, "");
    if (transformType[category].option) {
      setQueryParams(transformType[category].option!.api, "");
    }
  };

  // Функция применения фильтров
  const applyFilters = () => {
    // Фильтруем выбранные checkbox, оставляя только существующие ID
    const validCheckboxIds = selectedCheckbox.filter((id) =>
      availableCheckboxIds.includes(id)
    );

    // Фильтруем выбранные options, оставляя только существующие ID
    const validOptionIds = selectedOptions.filter((id) =>
      availableOptionIds.includes(id)
    );

    // Обновляем состояние с валидными ID
    if (validCheckboxIds.length !== selectedCheckbox.length) {
      setSelectedCheckbox(validCheckboxIds);
    }
    if (validOptionIds.length !== selectedOptions.length) {
      setSelectedOptions(validOptionIds);
    }

    // Отправляем выбранные checkbox
    if (validCheckboxIds.length > 0) {
      setQueryParams(
        transformType[category].checkbox.query,
        validCheckboxIds.join(",")
      );
    } else {
      setQueryParams(transformType[category].checkbox.query, "");
    }

    // Отправляем выбранные options (если есть)
    if (transformType[category].option && validOptionIds.length > 0) {
      setQueryParams(
        transformType[category].option!.api,
        validOptionIds.join(",")
      );
    } else if (transformType[category].option) {
      setQueryParams(transformType[category].option!.api, "");
    }
  };

  return (
    <FilterMainAdUi
      checkbox={checkbox}
      option={options}
      isLoad={isLoad}
      selectedCheckbox={selectedCheckbox}
      selectedOptions={selectedOptions}
      onCheckboxChange={handleCheckboxChange}
      onOptionChange={handleOptionChange}
      onApply={applyFilters}
      onReset={resetFilters}
    />
  );
};

export { FilterMainAdUi, ClientFilterMainAd };

// "use client";

// import { AdCategory } from "@/features/api/site/ads";
// import {
//   DictionariesOptionType,
//   dictionariesService,
//   DictionariesType,
// } from "@/features/api/site/dictionaries";
// import { Button } from "@/shared/ui/button";
// import { Checkbox } from "@/shared/ui/checkbox";
// import { Label } from "@/shared/ui/label";
// import { Skeleton } from "@/shared/ui/skeleton";
// import { useEffect, useState } from "react";

// interface FilterItem {
//   title: string;
//   list: DictionariesType[];
// }

// interface FilterMainAdUiProps {
//   checkbox: FilterItem | null;
//   option: FilterItem | null;
//   isLoad: boolean;
//   selectedCheckbox: string[];
//   selectedOptions: string[];
//   onCheckboxChange: (id: string, checked: boolean) => void;
//   onOptionChange: (id: string, checked: boolean) => void;
//   onClick: () => void;
// }

// const FilterMainAdUi = ({
//   checkbox,
//   option,
//   isLoad,
//   selectedCheckbox,
//   selectedOptions,
//   onCheckboxChange,
//   onOptionChange,
//   onClick,
// }: FilterMainAdUiProps) => {
//   if (isLoad) return <Skeleton className="bg-gray-50 w-full h-20" />;

//   return (
//     <div
//       className="h-fit w-full rounded-xl bg-gray-50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
//       data-testid="filter-section"
//     >
//       <p className="text-xl">Фильтр</p>

//       {checkbox && (
//         <div className="space-y-2 mt-5">
//           <p className="mb-4 font-semibold">{checkbox.title}</p>
//           {checkbox.list.map((item) => (
//             <div key={item.id} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`checkbox-${item.id}`}
//                 checked={selectedCheckbox.includes(String(item.id))}
//                 onCheckedChange={(checked) =>
//                   onCheckboxChange(String(item.id), checked as boolean)
//                 }
//               />
//               <Label htmlFor={`checkbox-${item.id}`}>{item.title}</Label>
//             </div>
//           ))}
//         </div>
//       )}

//       {option && (
//         <div className="space-y-2 mt-5">
//           <p className="mb-4 font-semibold">{option.title}</p>
//           {option.list.map((item) => (
//             <div key={item.id} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`option-${item.id}`}
//                 checked={selectedOptions.includes(String(item.id))}
//                 onCheckedChange={(checked) =>
//                   onOptionChange(String(item.id), checked as boolean)
//                 }
//               />
//               <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
//             </div>
//           ))}
//         </div>
//       )}

//       <Button onClick={onClick} className="w-full mt-7">
//         Применить
//       </Button>
//     </div>
//   );
// };

// const ClientFilterMainAd = ({
//   category,
//   setQueryParams,
// }: {
//   category: AdCategory;
//   setQueryParams: (key: string, value: string | number) => void;
// }) => {
//   interface Filter {
//     checkbox: {
//       title: string;
//       query: string;
//     };
//     option?: {
//       title: string;
//       api: DictionariesOptionType;
//     };
//   }

//   const transformType: Record<AdCategory, Filter> = {
//     housing: {
//       checkbox: {
//         title: "Тип жилья",
//         query: "housing_type",
//       },
//       option: { title: "Удобства", api: "comfort-items" },
//     },
//     transport: {
//       checkbox: {
//         title: "Тип транспорта",
//         query: "transport_type",
//       },
//       option: { title: "Опции", api: "transport-options" },
//     },
//     tour: {
//       checkbox: {
//         title: "Тип тура",
//         query: "tour_type",
//       },
//     },
//     recreation: {
//       checkbox: {
//         title: "Тип отдыха",
//         query: "recreation_type",
//       },
//     },
//     excursion: {
//       checkbox: {
//         title: "Тип экскурсии",
//         query: "excursion_type",
//       },
//     },
//   };

//   const [checkbox, setCheckbox] = useState<FilterItem | null>(null);
//   const [options, setOptions] = useState<FilterItem | null>(null);
//   const [isLoad, setLoad] = useState<boolean>(true);

//   // Состояния для отслеживания выбранных значений
//   const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [checkboxResponse, optionsResponse] = await Promise.all([
//           dictionariesService.getAdType(category),
//           transformType[category].option
//             ? dictionariesService.getOptions(
//                 transformType[category].option!.api
//               )
//             : Promise.resolve(null),
//         ]);

//         setCheckbox({
//           title: transformType[category].checkbox.title,
//           list: checkboxResponse,
//         });

//         if (transformType[category].option && optionsResponse) {
//           setOptions({
//             title: transformType[category].option!.title,
//             list: optionsResponse,
//           });
//         }
//       } catch (error) {
//         console.error("Ошибка загрузки данных:", error);
//       } finally {
//         setLoad(false);
//       }
//     };

//     fetchData();
//   }, [category]);

//   // Обработчики изменений чекбоксов
//   const handleCheckboxChange = (id: string, checked: boolean) => {
//     setSelectedCheckbox((prev) =>
//       checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
//     );
//   };

//   const handleOptionChange = (id: string, checked: boolean) => {
//     setSelectedOptions((prev) =>
//       checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
//     );
//   };

//   // Функция применения фильтров
//   const applyFilters = () => {
//     // Отправляем выбранные checkbox
//     if (selectedCheckbox.length > 0) {
//       setQueryParams(
//         transformType[category].checkbox.query,
//         selectedCheckbox.join(",")
//       );
//     } else {
//       setQueryParams(transformType[category].checkbox.query, "");
//     }

//     // Отправляем выбранные options (если есть)
//     if (transformType[category].option && selectedOptions.length > 0) {
//       setQueryParams(
//         transformType[category].option!.api,
//         selectedOptions.join(",")
//       );
//     } else if (transformType[category].option) {
//       setQueryParams(transformType[category].option!.api, "");
//     }
//   };

//   return (
//     <FilterMainAdUi
//       checkbox={checkbox}
//       option={options}
//       isLoad={isLoad}
//       selectedCheckbox={selectedCheckbox}
//       selectedOptions={selectedOptions}
//       onCheckboxChange={handleCheckboxChange}
//       onOptionChange={handleOptionChange}
//       onClick={applyFilters}
//     />
//   );
// };

// export { FilterMainAdUi, ClientFilterMainAd };

// // // "use client";

// // // import { AdCategory } from "@/features/api/site/ads";
// // // import {
// // //   DictionariesOptionType,
// // //   dictionariesService,
// // //   DictionariesType,
// // // } from "@/features/api/site/dictionaries";
// // // import { CommonLoader } from "@/shared/common";
// // // import { Button } from "@/shared/ui/button";
// // // import { Checkbox } from "@/shared/ui/checkbox";
// // // import { Label } from "@/shared/ui/label";
// // // import { Skeleton } from "@/shared/ui/skeleton";
// // // import { useEffect, useState } from "react";

// // // interface FilterItem {
// // //   title: string;
// // //   list: DictionariesType[];
// // // }

// // // interface FilterMainAdUiProps {
// // //   checkbox: FilterItem | null;
// // //   option: FilterItem | null;
// // //   isLoad: boolean;
// // // }
// // // const FilterMainAdUi = ({
// // //   checkbox,
// // //   option,
// // //   isLoad,
// // //   onClick,
// // // }: FilterMainAdUiProps) => {
// // //   if (isLoad) return <Skeleton className="bg-gray-50 w-full h-20" />;

// // //   return (
// // //     <div
// // //       className="h-fit w-full rounded-xl bg-gray-50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
// // //       data-testid="filter-section"
// // //     >
// // //       <p className="text-xl">Фильтр</p>

// // //       {checkbox && (
// // //         <div className="space-y-2 mt-5">
// // //           <p className="mb-4 font-semibold">{checkbox.title}</p>

// // //           {checkbox.list.map((item) => (
// // //             <div key={item.id} className="space-x-2">
// // //               <Checkbox id={String(item.title)} value={item.title}></Checkbox>
// // //               <Label htmlFor={String(item.title)}>{item.title}</Label>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {option && (
// // //         <div className="space-y-2 mt-5">
// // //           <p className="mb-4 font-semibold">{option.title}</p>

// // //           {option.list.map((item) => (
// // //             <div key={item.id} className="space-x-2">
// // //               <Checkbox id={String(item.title)} value={item.title}></Checkbox>
// // //               <Label htmlFor={String(item.title)}>{item.title}</Label>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       <Button onClick={onClick} className="w-full mt-7">
// // //         Применить
// // //       </Button>
// // //     </div>
// // //   );
// // // };

// // // const ClientFilterMainAd = ({
// // //   category,
// // //   setQueryParams,
// // // }: {
// // //   category: AdCategory;
// // //   setQueryParams: () => void;
// // // }) => {
// // //   interface Filter {
// // //     checkbox: {
// // //       title: string;
// // //       query: string;
// // //       // api: DictionariesAdTypeCategory;
// // //     };
// // //     option?: {
// // //       title: string;
// // //       api: DictionariesOptionType;
// // //     };
// // //     customFilters?: {
// // //       title: string;
// // //       query: string;
// // //       type: "dropdown" | "radio" | "checkbox" | "switch";
// // //       options: { label: string; value: string | boolean }[];
// // //     }[];
// // //     rangeFilters?: {
// // //       // key: keyof RangeFilter;
// // //       title: string;
// // //       type: "price" | "date";
// // //       min?: number;
// // //       max?: number;
// // //     }[];
// // //   }

// // // const transformType: Record<AdCategory, Filter> = {
// // //   housing: {
// // //     checkbox: {
// // //       title: "Тип жилья",
// // //       query: "housing_type",
// // //       api: "housing",
// // //     },
// // //     option: { title: "Удобства", api: "comfort-items" },
// // //     customFilters: [
// // //       {
// // //         title: "Цена",
// // //         query: "price_type",
// // //         type: "switch",
// // //         options: [
// // //           { label: "За 1 день", value: "daily" },
// // //           { label: "За 1 час", value: "hourly" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Количество комнат",
// // //         query: "room_count",
// // //         type: "dropdown",
// // //         options: [
// // //           { label: "1 комната", value: "1" },
// // //           { label: "2 комнаты", value: "2" },
// // //           { label: "3 комнаты", value: "3" },
// // //           { label: "4+ комнат", value: "4" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Количество гостей",
// // //         query: "guests",
// // //         type: "dropdown",
// // //         options: [
// // //           { label: "1 гость", value: "1" },
// // //           { label: "2 гостя", value: "2" },
// // //           { label: "3 гостя", value: "3" },
// // //           { label: "4 гостя", value: "4" },
// // //           { label: "5+ гостей", value: "5" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Спальных мест",
// // //         query: "sleep_place_count",
// // //         type: "dropdown",
// // //         options: [
// // //           { label: "1 место", value: "1" },
// // //           { label: "2 места", value: "2" },
// // //           { label: "3 места", value: "3" },
// // //           { label: "4 места", value: "4" },
// // //           { label: "5+ мест", value: "5" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Дополнительные условия",
// // //         query: "additional_conditions",
// // //         type: "checkbox",
// // //         options: [
// // //           { label: "Можно с детьми", value: "is_children_allowed" },
// // //           { label: "Можно с животными", value: "is_pets_allowed" },
// // //         ],
// // //       },
// // //     ],
// // //     rangeFilters: [
// // //       {
// // //         key: "price_per_hour",
// // //         title: "Цена за час",
// // //         type: "price",
// // //         min: 0,
// // //         max: 10000,
// // //       },
// // //       {
// // //         key: "price_per_day",
// // //         title: "Цена за день",
// // //         type: "price",
// // //         min: 0,
// // //         max: 50000,
// // //       },
// // //     ],
// // //   },
// // //   transport: {
// // //     checkbox: {
// // //       title: "Тип транспорта",
// // //       query: "transport_type",
// // //       api: "transport",
// // //     },
// // //     option: { title: "Опции", api: "transport-options" },
// // //     customFilters: [
// // //       {
// // //         title: "Цена",
// // //         query: "price_type",
// // //         type: "switch",
// // //         options: [
// // //           { label: "За 1 день", value: "daily" },
// // //           { label: "За 1 час", value: "hourly" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Дополнительные опции",
// // //         query: "transport_options",
// // //         type: "checkbox",
// // //         options: [
// // //           { label: "Доставка", value: "is_delivery" },
// // //           { label: "Детское кресло", value: "child_seat" },
// // //         ],
// // //       },
// // //     ],
// // //     rangeFilters: [
// // //       {
// // //         key: "price_per_hour",
// // //         title: "Цена за час",
// // //         type: "price",
// // //         min: 0,
// // //         max: 10000,
// // //       },
// // //       {
// // //         key: "price_per_day",
// // //         title: "Цена за день",
// // //         type: "price",
// // //         min: 0,
// // //         max: 50000,
// // //       },
// // //     ],
// // //   },
// // //   tour: {
// // //     checkbox: {
// // //       title: "Тип тура",
// // //       query: "tour_type",
// // //       api: "tour",
// // //     },
// // //     customFilters: [
// // //       {
// // //         title: "Цена",
// // //         query: "with_guide",
// // //         type: "switch",
// // //         options: [
// // //           { label: "С гидом", value: "with_guide" },
// // //           { label: "Без гида", value: "" },
// // //         ],
// // //       },
// // //       {
// // //         title: "Горящие туры",
// // //         query: "is_last_minute_tour",
// // //         type: "checkbox",
// // //         options: [{ label: "Горящие туры", value: "is_last_minute_tour" }],
// // //       },
// // //       {
// // //         title: "Дресс-код",
// // //         query: "dress_code",
// // //         type: "dropdown",
// // //         options: [
// // //           { label: "Повседневный", value: "casual" },
// // //           { label: "Деловой", value: "business" },
// // //           { label: "Спортивный", value: "sport" },
// // //           { label: "Формальный", value: "formal" },
// // //         ],
// // //       },
// // //     ],
// // //     rangeFilters: [
// // //       {
// // //         key: "price_per_tour",
// // //         title: "Цена за тур",
// // //         type: "price",
// // //         min: 0,
// // //         max: 100000,
// // //       },
// // //     ],
// // //   },
// // //   recreation: {
// // //     checkbox: {
// // //       title: "Тип отдыха",
// // //       query: "recreation_type",
// // //       api: "recreation",
// // //     },
// // //     customFilters: [
// // //       {
// // //         title: "Средний чек",
// // //         query: "average_bill",
// // //         type: "dropdown",
// // //         options: [
// // //           { label: "До 1000 ₽", value: "0-1000" },
// // //           { label: "1000-3000 ₽", value: "1000-3000" },
// // //           { label: "3000-5000 ₽", value: "3000-5000" },
// // //           { label: "5000-10000 ₽", value: "5000-10000" },
// // //           { label: "Свыше 10000 ₽", value: "10000+" },
// // //         ],
// // //       },
// // //     ],
// // //     rangeFilters: [
// // //       {
// // //         key: "price_per_excursion",
// // //         title: "Цена за экскурсию",
// // //         type: "price",
// // //         min: 0,
// // //         max: 50000,
// // //       },
// // //     ],
// // //   },
// // //   excursion: {
// // //     checkbox: {
// // //       title: "Тип экскурсии",
// // //       query: "excursion_type",
// // //       api: "excursion",
// // //     },
// // //     customFilters: [
// // //       {
// // //         title: "С гидом",
// // //         query: "with_guide",
// // //         type: "checkbox",
// // //         options: [{ label: "С гидом", value: "with_guide" }],
// // //       },
// // //     ],
// // //     rangeFilters: [
// // //       {
// // //         key: "price_per_excursion",
// // //         title: "Цена за экскурсию",
// // //         type: "price",
// // //         min: 0,
// // //         max: 50000,
// // //       },
// // //     ],
// // //   },
// // // };

// // //   const [checkbox, setCheckbox] = useState<FilterItem | null>(null);
// // //   const [options, setOptions] = useState<FilterItem | null>(null);
// // //   const [isLoad, setLoad] = useState<boolean>(true);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const [checkboxResponse, optionsResponse] = await Promise.all([
// // //           dictionariesService.getAdType(category),
// // //           transformType[category].option
// // //             ? dictionariesService.getOptions(
// // //                 transformType[category].option!.api
// // //               )
// // //             : Promise.resolve(null),
// // //         ]);

// // //         setCheckbox({
// // //           title: transformType[category].checkbox.title,
// // //           list: checkboxResponse,
// // //         });

// // //         if (transformType[category].option && optionsResponse) {
// // //           setOptions({
// // //             title: transformType[category].option!.title,
// // //             list: optionsResponse,
// // //           });
// // //         }
// // //       } catch (error) {
// // //         console.error("Ошибка загрузки данных:", error);
// // //       } finally {
// // //         setLoad(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [category]);

// // //   const change = () => {
// // //     setQueryParams("housing_type", 2);
// // //     console.log(checkbox);
// // //   };

// // //   return (
// // //     <FilterMainAdUi
// // //       checkbox={checkbox}
// // //       option={options}
// // //       isLoad={isLoad}
// // //       onClick={change}
// // //     />
// // //   );
// // // };

// // // export { FilterMainAdUi, ClientFilterMainAd };

// // "use client";

// // import { AdCategory } from "@/features/api/site/ads";
// // import {
// //   DictionariesOptionType,
// //   dictionariesService,
// //   DictionariesType,
// // } from "@/features/api/site/dictionaries";
// // import { Button } from "@/shared/ui/button";
// // import { Checkbox } from "@/shared/ui/checkbox";
// // import { Label } from "@/shared/ui/label";
// // import { Skeleton } from "@/shared/ui/skeleton";
// // import { useEffect, useState } from "react";

// // interface FilterItem {
// //   title: string;
// //   list: DictionariesType[];
// // }

// // interface FilterMainAdUiProps {
// //   checkbox: FilterItem | null;
// //   option: FilterItem | null;
// //   isLoad: boolean;
// //   selectedCheckbox: Record<string, boolean>;
// //   selectedOptions: Record<string, boolean>;
// //   onCheckboxChange: (id: string, checked: boolean) => void;
// //   onOptionChange: (id: string, checked: boolean) => void;
// //   onClick: () => void;
// // }

// // const FilterMainAdUi = ({
// //   checkbox,
// //   option,
// //   isLoad,
// //   selectedCheckbox,
// //   selectedOptions,
// //   onCheckboxChange,
// //   onOptionChange,
// //   onClick,
// // }: FilterMainAdUiProps) => {
// //   if (isLoad) return <Skeleton className="bg-gray-50 w-full h-20" />;

// //   return (
// //     <div
// //       className="h-fit w-full rounded-xl bg-gray-50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
// //       data-testid="filter-section"
// //     >
// //       <p className="text-xl">Фильтр</p>

// //       {checkbox && (
// //         <div className="space-y-2 mt-5">
// //           <p className="mb-4 font-semibold">{checkbox.title}</p>
// //           {checkbox.list.map((item) => (
// //             <div key={item.id} className="flex items-center space-x-2">
// //               <Checkbox
// //                 id={`checkbox-${item.id}`}
// //                 checked={selectedCheckbox[item.id] || false}
// //                 onCheckedChange={(checked) =>
// //                   onCheckboxChange(String(item.id), checked as boolean)
// //                 }
// //               />
// //               <Label htmlFor={`checkbox-${item.id}`}>{item.title}</Label>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {option && (
// //         <div className="space-y-2 mt-5">
// //           <p className="mb-4 font-semibold">{option.title}</p>
// //           {option.list.map((item) => (
// //             <div key={item.id} className="flex items-center space-x-2">
// //               <Checkbox
// //                 id={`option-${item.id}`}
// //                 checked={selectedOptions[item.id] || false}
// //                 onCheckedChange={(checked) =>
// //                   onOptionChange(String(item.id), checked as boolean)
// //                 }
// //               />
// //               <Label htmlFor={`option-${item.id}`}>{item.title}</Label>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <Button onClick={onClick} className="w-full mt-7">
// //         Применить
// //       </Button>
// //     </div>
// //   );
// // };

// // const ClientFilterMainAd = ({
// //   category,
// //   setQueryParams,
// // }: {
// //   category: AdCategory;
// //   setQueryParams: (params: Record<string, string | number>) => void;
// // }) => {
// //   const [checkbox, setCheckbox] = useState<FilterItem | null>(null);
// //   const [options, setOptions] = useState<FilterItem | null>(null);
// //   const [isLoad, setLoad] = useState<boolean>(true);

// //   const [selectedCheckbox, setSelectedCheckbox] = useState<
// //     Record<string, boolean>
// //   >({});
// //   const [selectedOptions, setSelectedOptions] = useState<
// //     Record<string, boolean>
// //   >({});

// //   const transformType: Record<AdCategory, Filter> = {
// //     housing: {
// //       checkbox: {
// //         title: "Тип жилья",
// //         query: "housing_type",
// //         api: "housing",
// //       },
// //       option: { title: "Удобства", api: "comfort-items" },
// //       customFilters: [
// //         {
// //           title: "Цена",
// //           query: "price_type",
// //           type: "switch",
// //           options: [
// //             { label: "За 1 день", value: "daily" },
// //             { label: "За 1 час", value: "hourly" },
// //           ],
// //         },
// //         {
// //           title: "Количество комнат",
// //           query: "room_count",
// //           type: "dropdown",
// //           options: [
// //             { label: "1 комната", value: "1" },
// //             { label: "2 комнаты", value: "2" },
// //             { label: "3 комнаты", value: "3" },
// //             { label: "4+ комнат", value: "4" },
// //           ],
// //         },
// //         {
// //           title: "Количество гостей",
// //           query: "guests",
// //           type: "dropdown",
// //           options: [
// //             { label: "1 гость", value: "1" },
// //             { label: "2 гостя", value: "2" },
// //             { label: "3 гостя", value: "3" },
// //             { label: "4 гостя", value: "4" },
// //             { label: "5+ гостей", value: "5" },
// //           ],
// //         },
// //         {
// //           title: "Спальных мест",
// //           query: "sleep_place_count",
// //           type: "dropdown",
// //           options: [
// //             { label: "1 место", value: "1" },
// //             { label: "2 места", value: "2" },
// //             { label: "3 места", value: "3" },
// //             { label: "4 места", value: "4" },
// //             { label: "5+ мест", value: "5" },
// //           ],
// //         },
// //         {
// //           title: "Дополнительные условия",
// //           query: "additional_conditions",
// //           type: "checkbox",
// //           options: [
// //             { label: "Можно с детьми", value: "is_children_allowed" },
// //             { label: "Можно с животными", value: "is_pets_allowed" },
// //           ],
// //         },
// //       ],
// //       rangeFilters: [
// //         {
// //           key: "price_per_hour",
// //           title: "Цена за час",
// //           type: "price",
// //           min: 0,
// //           max: 10000,
// //         },
// //         {
// //           key: "price_per_day",
// //           title: "Цена за день",
// //           type: "price",
// //           min: 0,
// //           max: 50000,
// //         },
// //       ],
// //     },
// //     transport: {
// //       checkbox: {
// //         title: "Тип транспорта",
// //         query: "transport_type",
// //         api: "transport",
// //       },
// //       option: { title: "Опции", api: "transport-options" },
// //       customFilters: [
// //         {
// //           title: "Цена",
// //           query: "price_type",
// //           type: "switch",
// //           options: [
// //             { label: "За 1 день", value: "daily" },
// //             { label: "За 1 час", value: "hourly" },
// //           ],
// //         },
// //         {
// //           title: "Дополнительные опции",
// //           query: "transport_options",
// //           type: "checkbox",
// //           options: [
// //             { label: "Доставка", value: "is_delivery" },
// //             { label: "Детское кресло", value: "child_seat" },
// //           ],
// //         },
// //       ],
// //       rangeFilters: [
// //         {
// //           key: "price_per_hour",
// //           title: "Цена за час",
// //           type: "price",
// //           min: 0,
// //           max: 10000,
// //         },
// //         {
// //           key: "price_per_day",
// //           title: "Цена за день",
// //           type: "price",
// //           min: 0,
// //           max: 50000,
// //         },
// //       ],
// //     },
// //     tour: {
// //       checkbox: {
// //         title: "Тип тура",
// //         query: "tour_type",
// //         api: "tour",
// //       },
// //       customFilters: [
// //         {
// //           title: "Цена",
// //           query: "with_guide",
// //           type: "switch",
// //           options: [
// //             { label: "С гидом", value: "with_guide" },
// //             { label: "Без гида", value: "" },
// //           ],
// //         },
// //         {
// //           title: "Горящие туры",
// //           query: "is_last_minute_tour",
// //           type: "checkbox",
// //           options: [{ label: "Горящие туры", value: "is_last_minute_tour" }],
// //         },
// //         {
// //           title: "Дресс-код",
// //           query: "dress_code",
// //           type: "dropdown",
// //           options: [
// //             { label: "Повседневный", value: "casual" },
// //             { label: "Деловой", value: "business" },
// //             { label: "Спортивный", value: "sport" },
// //             { label: "Формальный", value: "formal" },
// //           ],
// //         },
// //       ],
// //       rangeFilters: [
// //         {
// //           key: "price_per_tour",
// //           title: "Цена за тур",
// //           type: "price",
// //           min: 0,
// //           max: 100000,
// //         },
// //       ],
// //     },
// //     recreation: {
// //       checkbox: {
// //         title: "Тип отдыха",
// //         query: "recreation_type",
// //         api: "recreation",
// //       },
// //       customFilters: [
// //         {
// //           title: "Средний чек",
// //           query: "average_bill",
// //           type: "dropdown",
// //           options: [
// //             { label: "До 1000 ₽", value: "0-1000" },
// //             { label: "1000-3000 ₽", value: "1000-3000" },
// //             { label: "3000-5000 ₽", value: "3000-5000" },
// //             { label: "5000-10000 ₽", value: "5000-10000" },
// //             { label: "Свыше 10000 ₽", value: "10000+" },
// //           ],
// //         },
// //       ],
// //       rangeFilters: [
// //         {
// //           key: "price_per_excursion",
// //           title: "Цена за экскурсию",
// //           type: "price",
// //           min: 0,
// //           max: 50000,
// //         },
// //       ],
// //     },
// //     excursion: {
// //       checkbox: {
// //         title: "Тип экскурсии",
// //         query: "excursion_type",
// //         api: "excursion",
// //       },
// //       customFilters: [
// //         {
// //           title: "С гидом",
// //           query: "with_guide",
// //           type: "checkbox",
// //           options: [{ label: "С гидом", value: "with_guide" }],
// //         },
// //       ],
// //       rangeFilters: [
// //         {
// //           key: "price_per_excursion",
// //           title: "Цена за экскурсию",
// //           type: "price",
// //           min: 0,
// //           max: 50000,
// //         },
// //       ],
// //     },
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [checkboxResponse, optionsResponse] = await Promise.all([
// //           dictionariesService.getAdType(category),
// //           transformType[category].option
// //             ? dictionariesService.getOptions(
// //                 transformType[category].option!.api
// //               )
// //             : Promise.resolve(null),
// //         ]);

// //         setCheckbox({
// //           title: transformType[category].checkbox.title,
// //           list: checkboxResponse,
// //         });

// //         if (transformType[category].option && optionsResponse) {
// //           setOptions({
// //             title: transformType[category].option!.title,
// //             list: optionsResponse,
// //           });
// //         }
// //       } catch (error) {
// //         console.error("Ошибка загрузки данных:", error);
// //       } finally {
// //         setLoad(false);
// //       }
// //     };

// //     fetchData();
// //   }, [category]);

// //   // Обработчики изменений чекбоксов
// //   const handleCheckboxChange = (id: string, checked: boolean) => {
// //     setSelectedCheckbox((prev) => ({
// //       ...prev,
// //       [id]: checked,
// //     }));
// //   };

// //   const handleOptionChange = (id: string, checked: boolean) => {
// //     setSelectedOptions((prev) => ({
// //       ...prev,
// //       [id]: checked,
// //     }));
// //   };

// //   // Функция для получения выбранных значений в нужном формате
// //   const getSelectedValues = () => {
// //     const result: Record<string, string> = {};

// //     // Обрабатываем checkbox (обычно это одиночный выбор)
// //     const selectedCheckboxIds = Object.entries(selectedCheckbox)
// //       .filter(([_, isChecked]) => isChecked)
// //       .map(([id]) => id);

// //     if (selectedCheckboxIds.length > 0 && checkbox) {
// //       result[transformType[category].checkbox.query] =
// //         selectedCheckboxIds.join(",");
// //     }

// //     // Обрабатываем options (множественный выбор)
// //     const selectedOptionIds = Object.entries(selectedOptions)
// //       .filter(([_, isChecked]) => isChecked)
// //       .map(([id]) => id);

// //     if (
// //       selectedOptionIds.length > 0 &&
// //       options &&
// //       transformType[category].option
// //     ) {
// //       result[transformType[category].option!.api] = selectedOptionIds.join(",");
// //     }

// //     return result;
// //   };

// //   const applyFilters = () => {
// //     const selectedParams = getSelectedValues();
// //     setQueryParams(selectedParams);
// //     console.log("Выбранные параметры:", selectedParams);
// //   };

// //   return (
// //     <FilterMainAdUi
// //       checkbox={checkbox}
// //       option={options}
// //       isLoad={isLoad}
// //       selectedCheckbox={selectedCheckbox}
// //       selectedOptions={selectedOptions}
// //       onCheckboxChange={handleCheckboxChange}
// //       onOptionChange={handleOptionChange}
// //       onClick={applyFilters}
// //     />
// //   );
// // };

// // export { FilterMainAdUi, ClientFilterMainAd };
