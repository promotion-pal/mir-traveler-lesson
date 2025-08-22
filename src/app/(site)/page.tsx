import {
  CardNavigationUi,
  WrapperNavigationUi,
} from "@/widgets/site/ads/navigation";

export default function MainPage() {
  return (
    <div>
      <WrapperNavigationUi>
        <CardNavigationUi type="transport" />
        <CardNavigationUi type="housing" />
        <CardNavigationUi type="tour" />
        <CardNavigationUi type="transport" />
      </WrapperNavigationUi>
    </div>
  );
}
