"use client";

import {
  AdCategory,
  HotOfferAd,
  PriceAdVariant,
} from "@/features/api/site/ads";
import { CommonEmpty, CommonPlugPhoto } from "@/shared/common";
import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function WrapperHotOfferUi({ data }: { data: HotOfferAd[] | null }) {
  if (!data) return <CommonEmpty />;

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="mt-8">
      <p className="text-xl font-semibold container mb-9 md:text-4xl">
        Горящие предложения
      </p>

      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="container">
          {data.map((ad) => (
            <CarouselItem
              className="flex basis-full justify-center sm:basis-auto"
              key={ad.id}
            >
              <CardHotOfferUi {...ad} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function CardHotOfferUi(props: HotOfferAd) {
  const { price, link } = useHotOfferFn();

  return (
    <div className="group w-[340px] rounded-2xl bg-gray-50">
      <div className="relative overflow-hidden rounded-2xl h-[230px] transition ease-in-out">
        {props.photos.length > 0 ? (
          <Image
            src={props.photos[0].photo}
            alt={props.title}
            fill
            className="object-cover"
          />
        ) : (
          <CommonPlugPhoto styleWrapper="bg-gray-100" />
        )}

        <div
          className={cn(
            "absolute inset-0 rounded-2xl transition group-hover:opacity-40",
            "image-overlay-gradient"
          )}
        />

        <div className="max-w-2/3 absolute left-4 top-4 flex flex-wrap gap-1">
          {props.is_studio && <Badge>Студия</Badge>}
          {props.is_last_minute_tour && <Badge>Горящий тур</Badge>}
        </div>

        <div className="absolute bottom-5 left-4 max-w-64 bg-black/70 px-2 rounded-lg">
          <p className="text-2xl font-medium text-white">{props.title}</p>
        </div>
      </div>

      <div className="relative px-4 py-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">{props.address.full_address}</p>
          {props.rating && (
            <Badge className="bg-yellow">
              <StarIcon />
              {props.rating}
            </Badge>
          )}
        </div>
        <div className="mb-3">
          <span className="text-sm text-gray line-through"></span>
          <p className="text-2xl font-medium">
            {price(props).toLocaleString("ru-RU")} р
            <span className="ml-1.5 text-base font-light">
              {props.price_per_day
                ? "/ сутки"
                : props.price_per_hour && "/ час"}
            </span>
          </p>
        </div>
        <div className="text-xs">
          <p>
            {props.guests && `Гостей: ${props.guests}`}
            {props.room_count && ` · Комнат: ${props.guests}`}
          </p>
          <p>{props.average_bill && `Средний чек: ${props.average_bill}`}</p>
        </div>
        <Button
          className="absolute bottom-5 right-4 rounded-full"
          size="icon"
          asChild
        >
          <Link href={`${link(props.category_type)}/${props.id}`}>
            <ArrowUpRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export { WrapperHotOfferUi, CardHotOfferUi };

const useHotOfferFn = () => {
  const price = (props: PriceAdVariant) => {
    return (
      props.price_per_day ||
      props.price_per_hour ||
      props.price_per_tour ||
      props.price_per_excursion ||
      0
    );
  };

  const link = (props: AdCategory) => {
    return ROUTE.SITE.ADS({ category: props });
  };

  return { price, link };
};
export { useHotOfferFn };
