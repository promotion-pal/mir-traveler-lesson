import { AdCategory } from "@/features/api/types";
import { cn } from "@/shared/lib/utils";
import { FC, ReactElement, ReactNode } from "react";
import CrescentIcon from "@/shared/icon/navigation/CrescentIcon.svg";
import EarthIcon from "@/shared/icon/navigation/EarthIcon.svg";
import HoopIcon from "@/shared/icon/navigation/HoopIcon.svg";
import MapIcon from "@/shared/icon/navigation/MapIcon.svg";
import SphereIcon from "@/shared/icon/navigation/SphereIcon.svg";
import Image from "next/image";
import { ROUTE } from "@/shared/config/path";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

interface WrapperNavigationProps {
  children: ReactNode;
}
const WrapperNavigation: FC<WrapperNavigationProps> = ({ children }) => {
  return (
    <div className={cn("container mt-4 flex flex-col")}>
      <p className="text-2xl font-semibold text-foreground md:text-4xl">
        Может пригодиться в путешествии
      </p>

      <div className="mt-9 flex flex-col items-center justify-between md:flex-row md:space-x-4">
        {children}
      </div>
    </div>
  );
};

interface CardNavigationProps {
  category: AdCategory;
}
const CardNavigation: FC<CardNavigationProps> = ({ category }) => {
  interface InfoNavigation {
    label: string;
    link: string;
    style: string;
    icon: ReactElement;
  }
  const infoNavigation: Record<AdCategory, InfoNavigation> = {
    housing: {
      label: "Аренда жилья",
      link: ROUTE.SITE.ADS.HOUSE,
      style: "bg-primary",
      icon: (
        <div className={cn(`absolute right-0 top-0 z-20`)}>
          <Image src={EarthIcon} alt="icon" width={240} height={240} />
        </div>
      ),
    },
    transport: {
      label: "Аренда транспорта",
      link: ROUTE.SITE.ADS.TRANSPORT,
      style: "bg-primary",
      icon: (
        <div className={cn(`absolute right-0 top-12 z-20`)}>
          <Image src={HoopIcon} alt="icon" width={200} height={200} />
        </div>
      ),
    },
    recreation: {
      label: "Отдых и развлечение",
      link: ROUTE.SITE.ADS.RECREATION,
      style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
      icon: (
        <div className={cn(`absolute -top-14 right-3 z-20`)}>
          <Image src={SphereIcon} alt="icon" width={220} height={220} />
        </div>
      ),
    },
    tour: {
      label: "Туры и экскурсии",
      link: ROUTE.SITE.ADS.TOUR,
      style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
      icon: (
        <div className={cn(`absolute -top-14 right-3 z-20`)}>
          <Image src={CrescentIcon} alt="icon" width={220} height={220} />
        </div>
      ),
    },
    excursion: {
      label: "Экскурсии",
      link: ROUTE.SITE.ADS.EXCURSION,
      style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
      icon: (
        <div className={cn(`absolute -top-14 right-3 z-20`)}>
          <Image src={MapIcon} alt="icon" width={240} height={240} />
        </div>
      ),
    },
  };

  return (
    <div
      className={cn(
        "relative grid w-full grid-cols-2 md:mt-0 mt-10 rounded-lg px-5 py-14 md:max-w-md h-[360px] lg:max-w-lg border border-border/50 shadow-sm hover:shadow-md transition-all duration-300",
        infoNavigation[category].style
      )}
    >
      <div className="flex">
        <div className="mt-auto">
          <p className="text-2xl font-bold text-primary-foreground">
            {infoNavigation[category].label}
          </p>

          <Link
            href={infoNavigation[category].link}
            className={"mt-3 flex group"}
          >
            <p className="font-regular whitespace-nowrap rounded-full bg-primary-foreground px-4 py-2 text-black transition-colors group-hover:bg-primary-foreground/90">
              Читать подробнее
            </p>
            <div className="ml-3 rounded-full bg-primary-foreground p-2 transition-all duration-200 group-hover:bg-primary-foreground/90 group-hover:scale-105">
              <ArrowUpRightIcon className="text-primary" />
            </div>
          </Link>

          {infoNavigation[category].icon}
        </div>
      </div>
    </div>
  );
};

export { WrapperNavigation, CardNavigation };
