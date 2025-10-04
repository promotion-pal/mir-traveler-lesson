import { AdCategory, adService } from "@/features/api/site/ads";
import { ClientAdsWidgets } from "./client";
import { Suspense } from "react";
import { CommonLoader } from "@/shared/common";

async function SsrAdsWidgets({ category }: { category: AdCategory }) {
  let ads = null;
  let hotOffer = null;

  try {
    const adsReq = await adService.get(category);
    const hotOfferReq = await adService.getHotOffer(category);

    ads = adsReq.results;
    hotOffer = hotOfferReq;
  } catch (error) {
    ads = null;
  }

  return (
    <Suspense fallback={<CommonLoader />}>
      <ClientAdsWidgets
        category={category}
        initAds={ads}
        hotOffer={hotOffer}
        banner={category}
      />
    </Suspense>
  );
}

export { SsrAdsWidgets };
