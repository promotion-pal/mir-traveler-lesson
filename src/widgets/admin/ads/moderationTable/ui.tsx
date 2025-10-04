"use client";

import { CommonEmptyAd } from "@/shared/common/empty";
import { ROUTE } from "@/shared/config/path";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { AdCategory } from "@/features/api/site/ads";
import { WrapperDialogManagerAgreement } from "@/entities/common/dialog";
import {
  AdminAdsModeration,
  adminAdsService,
  InfoAdminAdsModeration,
} from "@/features/api/admin/ads";
import { CommonDataTable } from "@/entities/common/table";
import { useEffect, useState } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

interface ModerationProps {
  data: AdminAdsModeration[] | null;
  activeType: AdCategory;
  isLoad: boolean;
}

const TableAdsModerationUi = ({
  data,
  activeType,
  isLoad,
}: ModerationProps) => {
  if (isLoad) return <Skeleton className="w-full h-20 bg-gray-100" />;
  if (!data || data.length == 0) return <CommonEmptyAd styleWrapper="mt-7" />;

  const adsModerationTableColumns = [
    {
      id: "1",
      field: "id" as const,
      headerName: "ID",
    },
    {
      id: "2",
      field: "ads" as const,
      headerName: "Объявление",
    },
    {
      id: "3",
      field: "moderator" as const,
      headerName: "Модератор",
    },
    {
      id: "4",
      field: "date" as const,
      headerName: "Дата создания",
    },
    {
      id: "5",
      field: "state" as const,
      headerName: "Состояние",
    },
    {
      id: "6",
      field: "status" as const,
      headerName: "Статус",
    },
    {
      id: "7",
      field: "actions" as const,
      headerName: "Действия",
    },
  ];

  return (
    <section>
      <CommonDataTable
        columns={adsModerationTableColumns}
        rows={data.map((ad) => ({
          // ads: ad.ad.title,
          // moderator: ad.employee?.full_name || "-",
          // date: formatTimestampLocal(ad.created_at, {
          //   day: "2-digit",
          //   month: "2-digit",
          //   year: "numeric",
          // }),
          ...ad,
        }))}
        renderCell={(item, type, props) => {
          switch (type) {
            case "ads":
              return (
                <Link
                  className="text-teal hover:underline"
                  href={ROUTE.ADMIN.ADS.MODERATION({
                    category: activeType,
                    id: props.id,
                  })}
                >
                  {props.ad.title}
                </Link>
              );
            // case "state":
            //   return (
            //     <Text
            //       style={extractActiveAdsBool(props.is_approved).color}
            //       title={extractActiveAdsBool(props.is_approved).label}
            //     />
            //   );
            // case "status":
            //   return (
            //     <Text
            //       title={extractApprovedAdsBool(props.is_approved).label}
            //       style={extractApprovedAdsBool(props.is_approved).color}
            //     />
            //   );
            case "date":
              return <time dateTime={props.created_at}>{item}</time>;
            case "actions":
              return (
                <WrapperDialogManagerAgreement
                  onConfirm={() =>
                    adminAdsService.confirmModeration(props.id, activeType)
                  }
                  onReject={async (comment) => {
                    await adminAdsService.rejectModeration(
                      props.id,
                      activeType,
                      comment
                    );
                  }}
                  disable={{
                    confirm: true,
                    reject: true,
                  }}
                />
              );
            default:
              return item;
          }
        }}
      />
    </section>
  );
};

const Text = ({ title, style }: { title: string; style: string }) => (
  <p className={cn("text-base", style)}>{title}</p>
);

interface ClientAdsModerationProps {
  activeType: AdCategory;
}
const ClientAdsModeration = ({ activeType }: ClientAdsModerationProps) => {
  const [ads, setAds] = useState<AdminAdsModeration[] | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(true);

  useEffect(() => {
    setIsLoad(true);

    adminAdsService
      .getModeration(activeType)
      .then((res) => setAds(res.results))
      .finally(() => setIsLoad(false));
  }, [activeType]);

  return (
    <TableAdsModerationUi data={ads} activeType={activeType} isLoad={isLoad} />
  );
};

export { ClientAdsModeration };
