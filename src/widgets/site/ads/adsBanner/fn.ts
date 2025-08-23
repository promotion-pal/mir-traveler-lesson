"use client";

import { adService, BannerPlacement } from "@/features/api/site/ads";
import { useState } from "react";

const useAdsBannersFn = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const get = async (placement: BannerPlacement) => {
    setIsLoad(true);

    try {
      const bannersResponse = await adService.getBanners(placement);
      return bannersResponse[0];
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      setIsLoad(false);
    }
  };

  return {
    get,
    isLoad,
  };
};

export { useAdsBannersFn };
