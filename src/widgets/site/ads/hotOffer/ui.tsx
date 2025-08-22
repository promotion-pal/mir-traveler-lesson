"use client";

import { HotOfferAd } from "@/features/api/site/ads";
import { CommonPlugPhoto } from "@/shared/common";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function WrapperHotOfferUi({ title }: { title: string }) {
  return (
    <section>
      <p>{title}</p>
    </section>
  );
}

function CardHotOfferUi({ props }: { props: HotOfferAd }) {
  return (
    <div className="group w-[340px] rounded-2xl bg-gray-light">
      <div className="relative h-[230px] transition ease-in-out">
        {props.photos.length > 0 ? (
          <Image
            src={props.photos[0].photo}
            alt={props.title}
            fill
            className="rounded-2xl object-cover"
          />
        ) : (
          <CommonPlugPhoto />
        )}

        <div
          className={cn(
            "absolute inset-0 rounded-2xl transition group-hover:opacity-40",
            "image-overlay-gradient"
          )}
        />

        <div className="max-w-2/3 absolute left-4 top-4 flex flex-wrap gap-1">
          {/* {props.is_studio && <Badge variant="teal">Студия</Badge>} */}
          {/* {props.is_last_minute_tour && ( */}
          {/* <Badge variant="teal">Горящий тур</Badge> */}
          {/* )} */}
        </div>

        {/* <Favourites
        idAd={+data.id}
        category={data.category_type}
        isFavorite={false}
      /> */}

        <p className="absolute bottom-5 left-4 max-w-64 text-2xl font-medium text-white">
          {props.title}
        </p>
      </div>

      <div className="relative px-4 py-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm">{props.address.full_address}</p>
          {/* {data.rating && (
            <Badge className="bg-yellow">
              <StarIcon />
              {data.rating}
            </Badge>
          )} */}
        </div>
        <div className="mb-3">
          <span className="text-sm text-gray line-through"></span>
          <p className="text-2xl font-medium">
            {/* {props..toLocaleString("ru-RU")} р */}
            <span className="ml-1.5 text-base font-light">
              {/* {data.price_per_day ? "/ сутки" : data.price_per_hour && "/ час"} */}
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
          className="absolute bottom-5 right-4"
          //   variant="outline-teal"
          //   radius="full"
          size="icon"
          asChild
        >
          {/* <Link href={`${link()}/${props.id}`}>
            <ArrowUpRight />
          </Link> */}
        </Button>
      </div>
    </div>
  );
}

export { WrapperHotOfferUi, CardHotOfferUi };
