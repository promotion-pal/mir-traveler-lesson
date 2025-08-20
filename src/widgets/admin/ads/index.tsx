import { AdCategory } from '@/features/api/types';
import { InfoAdminAdsModeration } from '@/features/api/types/admin/ads/moderation';
import { DataTable } from '@/features/content/dataTable';
import { extractActiveAdsBool, extractApprovedAdsBool } from '@/features/utils';
import { formatTimestampLocal } from '@/features/utils/extract-time';
import { CommonLoader } from '@/shared/common';
import { cn } from '@/shared/lib/utils';

interface ModerationProps {
  data: InfoAdminAdsModeration | null;
  type: AdCategory;
}

const TableAdsModeration = ({ data, type }: ModerationProps) => {
  const adsModerationTableColumns = [
    {
      id: '1',
      field: 'id' as const,
      headerName: 'ID',
    },
    {
      id: '2',
      field: 'ads' as const,
      headerName: 'Объявление',
    },
    {
      id: '3',
      field: 'moderator' as const,
      headerName: 'Модератор',
    },
    {
      id: '4',
      field: 'date' as const,
      headerName: 'Дата создания',
    },
    {
      id: '5',
      field: 'state' as const,
      headerName: 'Состояние',
    },
    {
      id: '6',
      field: 'status' as const,
      headerName: 'Статус',
    },
    {
      id: '7',
      field: 'actions' as const,
      headerName: 'Действия',
    },
  ];

  return (
    <section>
      {data ? (
        <DataTable
          columns={adsModerationTableColumns}
          rows={data.results.map((ad) => ({
            ads: ad.ad.title,
            moderator: ad.employee?.full_name || '-',
            date: formatTimestampLocal(ad.created_at, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
            ...ad,
          }))}
          renderCell={(item, type, props) => {
            switch (type) {
              case 'state':
                return (
                  <Text
                    title={extractActiveAdsBool(props.is_approved).label}
                    style={extractActiveAdsBool(props.is_approved).color}
                  />
                );
              case 'status':
                return (
                  <Text
                    title={extractApprovedAdsBool(props.is_approved).label}
                    style={extractApprovedAdsBool(props.is_approved).color}
                  />
                );
              case 'date':
                return <time dateTime={props.created_at}>{item}</time>;
              default:
                return item;
            }
          }}
        />
      ) : (
        <CommonLoader />
      )}
    </section>
  );
};

const Text = ({ title, style }: { title: string; style: string }) => (
  <p className={cn('text-base', style)}>{title}</p>
);

export { TableAdsModeration };
