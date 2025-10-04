"use client";

import { AdCategory, MainAds } from "@/features/api/site/ads";
import { CommonPlugPhoto } from "@/shared/common";
import { ArrowUpRight, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  dictionariesService,
  DictionariesType,
} from "@/features/api/site/dictionaries";

const WrapperMainAdUi = ({ data }: { data: MainAds[] | null }) => {
  if (!data) return;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <CardMainAdUi key={item.id} {...item} />
      ))}
    </div>
  );
};

const CardMainAdUi = (props: MainAds) => (
  <article className="flex h-[200px] w-full max-w-[664px] overflow-hidden rounded-lg bg-gray-100">
    <div className="relative h-full w-[237px] flex-shrink-0 overflow-hidden rounded-l-lg">
      {props.photos.length ? (
        <Image
          src={props.photos[0].photo}
          alt={props.title}
          fill
          className="object-cover"
          priority={false}
        />
      ) : (
        <CommonPlugPhoto />
      )}

      {/* Category badge */}
      <div className="absolute left-4 top-4">
        {/* <span className="inline-block rounded-lg bg-[#07ADA7] px-3 py-1 text-sm font-medium text-white">
          {type === "transport"
            ? "Транспорт"
            : type === "housing"
            ? "Жилье"
            : type === "tour"
            ? "Туры"
            : type === "recreation"
            ? "Отдых"
            : "Экскурсии"}
        </span> */}
      </div>
    </div>

    <div className="flex flex-1 flex-col justify-between p-4">
      <div>
        <p className="line-clamp-2 text-lg font-medium text-gray-900">
          {props.title}
        </p>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <MapPinIcon size={16} className="text-gray-400" />
          <span className="line-clamp-1">{props.address.full_address}</span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          {/* <Rating rating={ad.rating} className="text-sm" /> */}
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-xl font-semibold text-gray-900">
            {props.price}{" "}
            <span className="text-sm font-normal text-gray-600">
              {props.rent_type}
            </span>
          </p>

          <Link
            // href={`${link[type]}/${ad.id}`}
            href={""}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50"
          >
            <ArrowUpRight size={18} className="text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  </article>
);

export const CITY = {
  KHABAROVSK: {
    name: "Хабаровск",
    coords: [48.48271, 135.08379] as [number, number],
  },
};

const MapContainer = dynamic(
  () => import("@/widgets/site/mapContainer/index"),
  {
    loading: () => (
      <div className="h-full animate-pulse rounded-xl bg-gray-200" />
    ),
  }
);

function MapMainAdUi({
  ads = [],
  defaultCenter = CITY.KHABAROVSK.coords,
  lat,
  lng,
  city,
}: {
  ads?: MainAds[];
  defaultCenter?: [number, number];
  lat?: string;
  lng?: string;
  city?: string;
}) {
  type StatusSearchLocation = "error" | "success" | "isLoading" | "idle";

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [statusLocation, setStatusLocation] =
    useState<StatusSearchLocation>("isLoading");
  //   const updateSearchParams = useUpdateSearchParams();
  const isInitialMount = useRef(true);

  // Основной эффект для управления состоянием карты
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Если город очищен - сбрасываем параметры и центр карты
    if (!city) {
      //   updateSearchParams({ lat: null, lng: null }, { replace: true });
      setMapCenter(defaultCenter);
      setStatusLocation("idle");
      return;
    }

    // Если есть координаты в URL - используем их
    if (lat && lng) {
      setMapCenter([parseFloat(lat), parseFloat(lng)]);
      setStatusLocation("success");
      return;
    }

    // Если нет координат - запрашиваем геолокацию
    requestGeolocation();
  }, [city, lat, lng, defaultCenter]);

  // Функция запроса геолокации
  const requestGeolocation = async () => {
    setStatusLocation("isLoading");
    const { success, position } = await requestGeolocationPermission();

    if (success && position) {
      const newCenter: [number, number] = [
        position.coords.latitude,
        position.coords.longitude,
      ];

      setMapCenter(newCenter);
      setStatusLocation("success");

      // Обновляем URL только если город указан
      if (city) {
        // updateSearchParams(
        //   {
        //     lat: newCenter[0].toFixed(6),
        //     lng: newCenter[1].toFixed(6),
        //   },
        //   { replace: true }
        // );
      }
    } else {
      setMapCenter(defaultCenter);
      setStatusLocation("idle");
    }
  };

  // Формирование точек для карты
  const points = useMemo(() => {
    return ads
      .filter((ad) => {
        if (!ad.address) return false;

        const lat = ad.address.latitude;
        const lng = ad.address.longitude;

        return (
          lat !== undefined &&
          lng !== undefined &&
          !isNaN(parseFloat(lat)) &&
          !isNaN(parseFloat(lng))
        );
      })
      .map((ad) => ({
        key: ad.id,
        position: [
          Number(ad.address!.latitude),
          Number(ad.address!.longitude),
        ] as [number, number],
        text: ad.title,
      }));
  }, [ads]);

  const WrapperStatus = ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => (
    <div className={cn("mb-4 rounded-lg bg-gray-100 px-2 py-1", className)}>
      {children}
    </div>
  );

  return (
    <section className="relative w-full">
      {statusLocation === "isLoading" && (
        <WrapperStatus className="flex items-center justify-between">
          <p>Проверка местоположения</p>
          <Loader2Icon size="25" className="animate-spin text-gray-400" />
        </WrapperStatus>
      )}

      {statusLocation === "success" && (
        <WrapperStatus className="text-center">
          <p className="text-primary">
            {city ? `Поиск по городу ${city}` : "Локация определена успешно"}
          </p>
        </WrapperStatus>
      )}

      {statusLocation === "idle" && (
        <WrapperStatus className="space-y-2 text-center">
          <p className="text-red-500">Не удалось определить местоположение</p>
          <p className="text-green-500">Поиск по городу Хабаровск</p>
        </WrapperStatus>
      )}

      <MapContainer
        key={`map-${JSON.stringify(points)}-${mapCenter[0]}-${mapCenter[1]}`}
        className="h-[300px] w-full md:h-[700px]"
        center={mapCenter}
        points={points}
        zoom={points.length > 0 ? 12 : 10}
      />
    </section>
  );
}

async function requestGeolocationPermission(): Promise<{
  success: boolean;
  position?: GeolocationPosition;
  error?: string;
}> {
  if (!navigator.geolocation) {
    return {
      success: false,
      error: "Ваш браузер не поддерживает геолокацию",
    };
  }

  return new Promise((resolve) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          success: true,
          position,
        });
      },
      (error) => {
        let errorMessage = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Доступ к геолокации запрещен пользователем";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Информация о местоположении недоступна";
            break;
          case error.TIMEOUT:
            errorMessage = "Время ожидания истекло";
            break;
          default:
            errorMessage = "Неизвестная ошибка при получении геолокации";
        }

        resolve({
          success: false,
          error: errorMessage,
        });
      },
      options
    );
  });
}

export { WrapperMainAdUi, MapMainAdUi };
