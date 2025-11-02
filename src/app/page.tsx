import { WrapperNavigation, CardNavigation } from "@/widgets/site/navigation";

export default function Home() {
  return (
    <div>
      <WrapperNavigation>
        <CardNavigation category="housing" />
        <CardNavigation category="transport" />
        <CardNavigation category="excursion" />
      </WrapperNavigation>
    </div>
  );
}
