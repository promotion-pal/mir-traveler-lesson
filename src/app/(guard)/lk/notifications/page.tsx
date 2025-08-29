import { LkWrapper } from "@/entities/lk/wrapper";
import { ClientNotificationsUi } from "@/widgets/lk/notifications";

export default function NotificationPage() {
  return (
    <LkWrapper title="Уведомления">
      <ClientNotificationsUi />
    </LkWrapper>
  );
}
