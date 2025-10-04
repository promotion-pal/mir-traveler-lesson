"use client";

import {
  AdCategory,
  adService,
  BannerPlacement,
  HotOfferAd,
  MainAds,
} from "@/features/api/site/ads";
import { WrapperHotOfferUi } from "../hotOffer";
import { AdsBannerClient } from "../adsBanner";
import { CardNavigationUi, WrapperNavigationUi } from "../navigation";
import { MapMainAdUi, WrapperMainAdUi } from "./ui";
import { ClientFilterMainAd } from "../../filter/ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QueryParams } from "@/features/api/fetch";

function ClientAdsWidgets({
  category,
  initAds,
  hotOffer,
  banner,
}: {
  category: AdCategory;
  initAds: MainAds[] | null;
  hotOffer: HotOfferAd[] | null;
  banner: BannerPlacement;
}) {
  const navigation: Record<AdCategory, AdCategory[]> = {
    housing: ["excursion", "transport", "tour"],
    transport: ["excursion", "housing", "tour"],
    tour: ["excursion", "transport", "tour"],
    excursion: ["excursion", "transport", "tour"],
    recreation: ["excursion", "transport", "tour"],
  };

  const [ads, setAds] = useState<MainAds[] | null>(initAds);

  const { handleSearchChange, query } = useAdsWidgetsFn();

  useEffect(() => {
    console.log(query);
    adService.get(category, query).then((res) => setAds(res.results));
  }, [query]);

  return (
    <>
      <AdsBannerClient placement={banner} />
      <WrapperHotOfferUi data={hotOffer} />

      <div className="grid grid-cols-[20%_50%_25%] justify-between mt-10 container">
        <ClientFilterMainAd
          category={category}
          setQueryParams={handleSearchChange}
        />
        <WrapperMainAdUi data={ads} />
        <MapMainAdUi />
      </div>

      <WrapperNavigationUi>
        {navigation[category].map((item) => (
          <CardNavigationUi key={item} type={item} />
        ))}
      </WrapperNavigationUi>
    </>
  );
}

export { ClientAdsWidgets };

// const useAdsWidgetsFn = () => {
//   const [query, setQuery] = useState<QueryParams | undefined>(undefined);

//   const updateUrlParam = (key: string, value: string | number) => {
//     const params = new URLSearchParams(window.location.search);

//     if (value === "" || value === null || value === undefined) {
//       params.delete(key);
//     } else {
//       params.set(key, String(value));
//     }

//     const newUrl = `${window.location.pathname}?${params.toString()}`;
//     window.history.replaceState(null, "", newUrl);
//   };

//   const searchParams = useSearchParams();

//   const params: Record<keyof SearchParamsMainAds, string | number> = {
//     count: searchParams.get("count") || 10,
//     search: searchParams.get("search") || "",
//     housing_type: searchParams.get("housing_type") || "",
//   };

//   const handleSearchChange = (key: string, value: string | number) => {
//     updateUrlParam(key, value);
//     setQuery((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return {
//     handleSearchChange,
//     params,
//     query,
//   };
// };

const useAdsWidgetsFn = () => {
  const [query, setQuery] = useState<QueryParams | undefined>(undefined);

  const updateUrlParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "" || value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const searchParams = useSearchParams();

  const params: Record<string, string | number> = {
    count: searchParams.get("count") || 10,
    search: searchParams.get("search") || "",
    housing_type: searchParams.get("housing_type") || "",
    transport_type: searchParams.get("transport_type") || "",
    tour_type: searchParams.get("tour_type") || "",
    recreation_type: searchParams.get("recreation_type") || "",
    excursion_type: searchParams.get("excursion_type") || "",
    "comfort-items": searchParams.get("comfort-items") || "",
    "transport-options": searchParams.get("transport-options") || "",
  };

  const handleSearchChange = (key: string, value: string | number) => {
    updateUrlParam(key, value);
    setQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    handleSearchChange,
    params,
    query,
  };
};

export { useAdsWidgetsFn };
