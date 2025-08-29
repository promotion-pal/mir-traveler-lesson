"use client";

import { businessAdService, UserAds } from "@/features/api/lk/business-ad";
import { AdCategory, AdPhoto } from "@/features/api/site/ads";
import { CommonEmpty } from "@/shared/common";
import { Skeleton } from "@/shared/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

function WrapperUserAdsUi({
  data,
  isLoad,
}: {
  data: UserAds[] | null;
  isLoad: boolean;
}) {
  console.log(data);

  if (isLoad) return <Skeleton className="w-full h-20 bg-gray-200" />;

  if (!data || data.length === 0) return <CommonEmpty />;

  return (
    <div className="space-y-6">
      {data.map((item) => (
        <CardUserAdsUi key={item.id} {...item} />
      ))}
    </div>
  );
}

const CardUserAdsUi = (props: UserAds) => (
  <section className="space-y-2">
    <p className="text-2xl font-medium text-teal">{props.title}</p>
    <p className="text-xl font-medium">{props.price}</p>

    <div>
      {props.photos.length > 0 && <ImageUserAd photos={props.photos} />}
    </div>

    <div className="flex gap-4">
      {/* <Rating rating={rating} /> */}
      {/* <CommonFavorite favorite={favorite_count} /> */}
    </div>

    <div className="flex gap-3">
      <div className="flex items-center gap-1.5">
        {/* <UserRoundIcon className="h-4 w-4" /> */}
        <span>{props.views_count} просмотров</span>
      </div>
    </div>
    <p className="text-lg text-gray-500">{props.text}</p>
    <p className="text-lg text-gray-500">Адрес: {props.address}</p>

    {/* <ButtonControlUserAd title={title} type={typeAd} idAd={id} /> */}
  </section>
);

interface ImageUserAdProps {
  photos: AdPhoto[];
}
const ImageUserAd = ({ photos }: ImageUserAdProps) => (
  <div className="mt-6">
    <div className="relative h-[300px] w-[300px] overflow-hidden rounded-xl">
      <Image src={photos[0].photo} fill alt="Фото" className="object-cover" />
    </div>
  </div>
);

const ClientUserAdsUi = ({ category }: { category: AdCategory }) => {
  const [ads, setAds] = useState<UserAds[] | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);

  useEffect(() => {
    setIsLoad(true);

    businessAdService
      .getUserAds(category)
      .then((res) => setAds(res.results))
      .finally(() => setIsLoad(false));
  }, [category]);

  return <WrapperUserAdsUi data={ads} isLoad={isLoad} />;
};

export { ClientUserAdsUi };
