import { cn } from "../lib/utils";

interface BaseCommonEmpty {
  styleWrapper?: string;
}

function CommonEmpty({ styleWrapper }: BaseCommonEmpty) {
  return (
    <div className={cn("text-gray-500", styleWrapper)}>Не удалось найти</div>
  );
}

const CommonEmptyAd = ({ styleWrapper }: BaseCommonEmpty) => {
  return (
    <div
      className={cn(
        "flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300",
        styleWrapper
      )}
    >
      <svg
        className="h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="mt-2 text-lg font-medium text-gray-900">
        Ничего не найдено
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Попробуйте изменить параметры поиска
      </p>
    </div>
  );
};

const CommonPlugPhoto = ({ styleWrapper }: BaseCommonEmpty) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center bg-gray-50",
      styleWrapper
    )}
  >
    {/* <p className="text-lg text-primary">{app.siteName}</p> */}
  </div>
);

export { CommonEmpty, CommonEmptyAd, CommonPlugPhoto };
