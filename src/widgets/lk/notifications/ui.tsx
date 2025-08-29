"use client";

import { userService } from "@/features/api/site/user";
import { UserNotification } from "@/features/api/site/user/types";
import { CommonEmpty } from "@/shared/common";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, useState } from "react";

const WrapperNotificationsUi = ({
  data,
  isLoad,
}: {
  data: UserNotification[] | null;
  isLoad: boolean;
}) => {
  if (isLoad) return <Skeleton className="w-full h-20 bg-gray-200" />;

  if (!data) return <CommonEmpty />;

  return (
    <div className="space-y-4 mt-8">
      {data.map((item) => (
        <CardNotificationsUi key={item.id} props={item} />
      ))}
    </div>
  );
};

function CardNotificationsUi({ props }: { props: UserNotification }) {
  return (
    <div key={props.id} className="rounded-xl bg-gray-100 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p>От: {props.sender}</p>
          <p>{props.subject}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* <p>{formattedDate}</p>
          {React.createElement(extractNotification(item.status).icon, {
            className: "h-5 w-5",
          })} */}

          <p>{props.status}</p>
        </div>
      </div>

      <p className="mt-4">{props.body}</p>
    </div>
  );
}

const ClientNotificationsUi = () => {
  const [notification, setNotification] = useState<UserNotification[] | null>(
    null
  );
  const [isLoad, setIsLoad] = useState<boolean>(true);

  useEffect(() => {
    setIsLoad(true);

    userService
      .getNotifications()
      .then((res) => {
        setNotification(res.results);
      })
      .catch((error) => {
        console.error("Ошибка загрузки уведомлений:", error);
        setNotification(null);
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, []);

  return <WrapperNotificationsUi data={notification} isLoad={isLoad} />;
};

export { ClientNotificationsUi };
