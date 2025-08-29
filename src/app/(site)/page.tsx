import { adService } from "@/features/api/site/ads";
import { AdsBannerClient } from "@/widgets/site/ads/adsBanner";
import { WrapperHotOfferUi } from "@/widgets/site/ads/hotOffer";

import {
  CardNavigationUi,
  WrapperNavigationUi,
} from "@/widgets/site/ads/navigation";

export default async function MainPage() {
  const hotOffer = await adService.getHotOffer("transport");

  return (
    <>
      <AdsBannerClient placement="main_page" />

      <WrapperHotOfferUi data={hotOffer} />

      <WrapperNavigationUi>
        <CardNavigationUi type="housing" />
        <CardNavigationUi type="tour" />
        <CardNavigationUi type="transport" />
      </WrapperNavigationUi>
    </>
  );
}
