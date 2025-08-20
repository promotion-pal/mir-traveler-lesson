import { SectionAd } from "@/features/api/site/ad";

const PATH = {
  SITE: {},
  ADMIN: {
    ADS: {
      MODERATION: "/admin/ads/moderation",
    },
  },
  LK: {},
};

interface DynamicPathProps {
  path: string;
  type?: SectionAd;
  id?: number;
}

const DYNAMIC_PATH = ({ path, type }: DynamicPathProps) => {};

export { PATH, DYNAMIC_PATH };

DYNAMIC_PATH({ path: PATH.ADMIN.ADS.MODERATION });
