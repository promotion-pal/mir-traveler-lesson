import { AdCategory } from "@/features/api/types";
import { envConfig } from "./env";

interface BasePageProps {
  id?: string | number;
  category?: AdCategory;
}

const DYNAMIC_PATH = (
  segments: (string | undefined | number)[],
  props?: BasePageProps
): string => {
  const filteredSegments = segments.filter(
    (s): s is string => s !== undefined && s !== ""
  );

  return `/${filteredSegments.join("/")}`;
};

const ROUTE = {
  SITE: {
    CONTACT: DYNAMIC_PATH(["contact"]),
    MAIN: DYNAMIC_PATH([""]),
    ADS: {
      HOUSE: DYNAMIC_PATH(["housing"]),
      TRANSPORT: DYNAMIC_PATH(["transport"]),
      RECREATION: DYNAMIC_PATH(["recreation"]),
      TOUR: DYNAMIC_PATH(["tour"]),
      EXCURSION: DYNAMIC_PATH(["excursion"]),
      DYNAMIC: (props: BasePageProps) =>
        DYNAMIC_PATH([props.category, String(props.id || "")], props),
    },
    ARTICLE: {
      BY_ID: (props?: BasePageProps) =>
        DYNAMIC_PATH(["article", String(props?.id)], props),
    },
  },
  LK: {
    USER: DYNAMIC_PATH(["lk", "user"]),
    NOTIFICATIONS: DYNAMIC_PATH(["lk", "notifications"]),
    WALLET: DYNAMIC_PATH(["lk", "wallet"]),
    ADS: {
      USER: DYNAMIC_PATH(["lk", "ads"]),
      CREATE: DYNAMIC_PATH(["lk", "ads", "create"]),
      CREATE_AD: (props: BasePageProps) =>
        DYNAMIC_PATH(["lk", "ads", props.category, "create"], props),
      EDIT: (props: BasePageProps) =>
        DYNAMIC_PATH(
          ["lk", "ads", props.category, String(props.id), "edit"],
          props
        ),
      TARIFF: (props: BasePageProps) =>
        DYNAMIC_PATH(
          ["lk", "ads", props.category, String(props.id), "tariff"],
          props
        ),
    },
    FAVORITES: DYNAMIC_PATH(["lk", "favorites"]),
    STATISTIC: DYNAMIC_PATH(["lk", "statistics"]),
  },
  ADMIN: {
    ADS: {
      MODERATION: (props?: BasePageProps) =>
        DYNAMIC_PATH(
          ["admin", "ads", props?.category, "moderation", props?.id],
          props
        ),
    },
    USER: {
      MODERATION: DYNAMIC_PATH(["admin", "user", "moderation"]),
    },
    TARIFF: DYNAMIC_PATH(["admin", "tariff"]),
    PERMISSION: DYNAMIC_PATH(["admin", "permission"]),
    SUBSCRIPTION: DYNAMIC_PATH(["admin", "subscriptions"]),
    DICTIONARIES: DYNAMIC_PATH(["admin", "dictionaries"]),
    ARTICLE: {
      DEF: DYNAMIC_PATH(["admin", "articles"]),
      CREATE: DYNAMIC_PATH(["admin", "articles", "create"]),
      EDIT: (props?: BasePageProps) =>
        DYNAMIC_PATH(["admin", "articles", String(props?.id), "edit"], props),
    },
    FEEDBACK: DYNAMIC_PATH(["admin", "feedback"]),
    EMPLOYEE: DYNAMIC_PATH(["admin", "employees"]),
    SUPPORT: DYNAMIC_PATH(["admin", "support"]),
    BANNERS: DYNAMIC_PATH(["admin", "banners"]),
    CONFIGURATION: DYNAMIC_PATH(["admin", "configurations"]),
    NEWS: DYNAMIC_PATH(["admin", "news"]),
    FLATPAGES: DYNAMIC_PATH(["admin", "flatpages"]),
  },
  AUTH: {
    LOGIN: DYNAMIC_PATH(["auth", "login"]),
    REGISTER: DYNAMIC_PATH(["auth", "register"]),
    NEW_PASSWORD: DYNAMIC_PATH(["auth", "new-password"]),
    RESET_PASSWORD: DYNAMIC_PATH(["auth", "reset-password"]),
    OTHER: {
      YANDEX: envConfig.baseApi + "/site/auth/yandex/login/",
      VK: envConfig.baseApi + "/site/auth/vk/login/",
      OK: envConfig.baseApi + "/site/auth/ok/login/",
    },
  },
  FLATPAGES: {
    SITE_RULES: DYNAMIC_PATH(["flatpage", "site_rules"]),
    PUBLIC_OFFER: DYNAMIC_PATH(["flatpage", "public_offer"]),
    REFUND_POLICY: DYNAMIC_PATH(["flatpage", "refund_policy"]),
    COOKIE_POLICY: DYNAMIC_PATH(["flatpage", "cookie_policy"]),
    USER_AGREEMENT: DYNAMIC_PATH(["flatpage", "user_agreement"]),
    PRIVACY_POLICY: DYNAMIC_PATH(["flatpage", "privacy_policy"]),
    LEGAL_INFORMATION: DYNAMIC_PATH(["flatpage", "legal_information"]),
    PARTNER_INFORMATION: DYNAMIC_PATH(["flatpage", "partner_information"]),
  },
};

export { DYNAMIC_PATH, ROUTE };
