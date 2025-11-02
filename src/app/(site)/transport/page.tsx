import { CardNavigation, WrapperNavigation } from "@/widgets/site/navigation";
import React from "react";

export default function page() {
  return (
    <div>
      <WrapperNavigation>
        <CardNavigation category="excursion" />
        <CardNavigation category="housing" />
        <CardNavigation category="tour" />
      </WrapperNavigation>
    </div>
  );
}
