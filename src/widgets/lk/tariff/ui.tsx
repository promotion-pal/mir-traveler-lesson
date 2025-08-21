import { LkTariff } from "@/features/api/lk/tariff";
import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

interface WrapperTariffLkUiProps {
  title: string;
  children: ReactNode;
}
export function WrapperTariffLkUi({ title, children }: WrapperTariffLkUiProps) {
  return (
    <section>
      <p>{title}</p>
      {children}
    </section>
  );
}

const cardTariffVariants = cva("rounded-xl p-5 border-[2px] border-black", {
  variants: {
    variant: {
      simple: "",
      maximum: "",
      constant: "",
      presence: "",
      select_widgets: "",
    },
    btn: {
      simple: "",
      maximum: "",
      constant: "",
      presence: "",
      select_widgets: "",
    },
  },
});

interface Props {}
export function CardTariffLkUi(props: LkTariff, {}) {
  return (
    <section className={cn(cardTariffVariants)}>
      <TitleTariffLkUi
        title={props.title}
        price={props.prices[0].full_price_for_day}
      />

      <p>{props.description}</p>
    </section>
  );
}

function TitleTariffLkUi({ title, price }: { title: string; price: string }) {
  return (
    <p className="font-semibold">
      {title} <span className="text-gray-400">{price}</span>
    </p>
  );
}
