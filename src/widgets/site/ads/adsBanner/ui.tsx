"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAdsBannersFn } from "./fn";
import { CommonEmpty, CommonLoader } from "@/shared/common";
import { AdBanner, BannerPlacement } from "@/features/api/site/ads";

function AdsBannerClient({
  placement = "main_page",
}: {
  placement?: BannerPlacement;
}) {
  const { get, isLoad } = useAdsBannersFn();

  const [banners, setBanners] = useState<AdBanner | null>(null);

  useEffect(() => {
    get(placement).then(setBanners);
  }, []);

  return !isLoad ? <AdsBannerUi props={banners} /> : <CommonLoader />;
}

interface AdsBannerUiProps {
  children?: React.ReactNode;
  childrenPosition?: "top" | "bottom";
  className?: string;
  props: AdBanner | null;
}

function AdsBannerUi({
  children,
  childrenPosition = "top",
  className,
  props,
}: AdsBannerUiProps) {
  if (!props) return <CommonEmpty />;

  return (
    <div
      className={cn(
        "relative w-full text-white pb-16 lg:pb-20 lg:pt-[12.5rem]",
        className
      )}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={props.banner_image}
          alt={props.banner_title}
          fill
          priority
          className="object-cover object-center rounded-b-[2rem]"
        />
        <div className="absolute inset-0 rounded-b-[2rem] image-overlay-gradient" />
      </div>

      <div className="container">
        {children && childrenPosition === "top" && (
          <div className="mb-10">{children}</div>
        )}

        <div className="max-w-[70%]">
          <h1
            className={cn("text-4xl font-semibold", "md:text-5xl xl:text-6xl")}
          >
            {props.banner_title}
          </h1>
          {props.slider_title && (
            <p className="text-lg mt-4">{props.slider_title}</p>
          )}
        </div>

        {children && childrenPosition === "bottom" && (
          <div className="mt-10">{children}</div>
        )}
      </div>
    </div>
  );
}

export { AdsBannerClient };
