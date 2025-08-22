import { AdCategory } from "@/features/api/site/ads";

interface BasePageProps {
  category?: AdCategory;
  id?: string | number;
}

const DYNAMIC_PATH = (
  segments: (string | undefined)[],
  props?: BasePageProps
): string => {
  const filteredSegments = segments.filter(
    (s): s is string => s !== undefined && s !== ""
  );

  if (props?.id !== undefined) {
    filteredSegments.push(String(props.id));
  }

  return `/${filteredSegments.join("/")}`;
};

const ROUTE = {
  SITE: {
    MAIN: DYNAMIC_PATH([""]),
    TRANSPORT: DYNAMIC_PATH(["transport"]),
    TOUR: DYNAMIC_PATH(["tour"]),
    HOUSE: DYNAMIC_PATH(["house"]),
  },
  ADMIN: {
    ADS: {
      MODERATION: (props?: BasePageProps) =>
        DYNAMIC_PATH(["admin", "ads", props?.category, "moderation"], props),
    },
    TARIFF: DYNAMIC_PATH(["admin", "tariff"]),
    DICTIONARIES: DYNAMIC_PATH(["admin", "dictionaries"]),
  },
  AUTH: {
    LOGIN: DYNAMIC_PATH(["auth", "login"]),
    REGISTER: DYNAMIC_PATH(["auth", "register"]),
  },
};

export { DYNAMIC_PATH, ROUTE };
