import { AdCategory } from "@/features/api/site/ads";
import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

interface WrapperNavigationCartProps {
  className?: string;
  children: React.ReactNode;
}
function WrapperNavigationUi({
  className,
  children,
}: WrapperNavigationCartProps) {
  return (
    <div className={cn("container mt-16 flex flex-col", className)}>
      <p className="text-2xl font-semibold md:text-4xl">
        Может пригодиться в путешествии
      </p>

      <div className="mt-9 flex flex-col items-center justify-between md:flex-row md:space-x-4">
        {children}
      </div>
    </div>
  );
}

interface InfoNavigation {
  label: string;
  link: string;
  style: string;
  icon: ReactElement;
}
const infoNavigation: Record<AdCategory, InfoNavigation> = {
  housing: {
    label: "Аренда жилья",
    link: ROUTE.SITE.MAIN,
    style: "bg-primary",
    icon: (
      <div className={cn(`absolute right-0 top-0 z-20`)}>
        {/* <GlobeGraphicIcon width={250} height={250} /> */}
      </div>
    ),
  },
  transport: {
    label: "Аренда транспорта",
    link: ROUTE.SITE.MAIN,
    style: "bg-primary",
    icon: (
      <div className={cn(`absolute right-0 top-12 z-20`)}>
        {/* <HoopIcon width={200} height={200} /> */}
      </div>
    ),
  },
  recreation: {
    label: "Отдых и развлечение",
    link: ROUTE.SITE.MAIN,
    style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
    icon: (
      <div className={cn(`absolute -top-14 right-3 z-20`)}>
        {/* <SphereIcon width={220} height={220} /> */}
      </div>
    ),
  },
  tour: {
    label: "Туры и экскурсии",
    link: ROUTE.SITE.MAIN,
    style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
    icon: (
      <div className={cn(`absolute -top-14 right-3 z-20`)}>
        {/* // <div className={cn(`absolute bottom-5 right-5 z-20`)}> */}
        {/* <CrescentIcon width={220} height={220} /> */}
      </div>
    ),
  },
  excursion: {
    label: "Экскурсии",
    link: ROUTE.SITE.MAIN,
    style: "bg-gradient-to-tr from-[#03A0D9] to-[#68DFF2]",
    icon: (
      <div className={cn(`absolute -top-14 right-3 z-20`)}>
        {/* // <div className={cn(`absolute bottom-5 right-5 z-20`)}> */}
        {/* <CrescentIcon width={220} height={220} /> */}
      </div>
    ),
  },
};

function CardNavigationUi({ type }: { type: AdCategory }) {
  const styleClass = infoNavigation[type].style;

  return (
    <div
      className={cn(
        "relative grid w-full grid-cols-2 md:mt-0 mt-10 rounded-lg px-5 py-14 md:max-w-md h-[360px] lg:max-w-lg",
        styleClass
      )}
    >
      <div className="flex">
        <div className="mt-auto">
          <p className="text-2xl font-bold text-white">
            {infoNavigation[type].label}
          </p>

          <Link href={infoNavigation[type].link} className={"mt-3 flex"}>
            <p className="font-regular; whitespace-nowrap rounded-full bg-white px-4 py-2">
              Читать подробнее
            </p>
            <div className="ml-3 rounded-full bg-white p-2">
              <ArrowUpRightIcon />
            </div>
          </Link>

          {infoNavigation[type].icon}
        </div>
      </div>
    </div>
  );
}

export { CardNavigationUi, WrapperNavigationUi };
