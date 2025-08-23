import { adService } from "@/features/api/site/ads";
import { AdsBannerClient } from "@/widgets/site/ads/adsBanner";
import { CardHotOfferUi, WrapperHotOfferUi } from "@/widgets/site/ads/hotOffer";
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
        <CardNavigationUi type="transport" />
        <CardNavigationUi type="housing" />
        <CardNavigationUi type="tour" />
        <CardNavigationUi type="transport" />
      </WrapperNavigationUi>
    </>
  );
}
