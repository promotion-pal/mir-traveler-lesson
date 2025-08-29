import { LkWrapper } from "@/entities/lk/wrapper";
import { ClientFavoritesUi } from "@/widgets/lk/favorites";

export default function LkFavoritesPage() {
  return (
    <LkWrapper title="Избранное">
      <ClientFavoritesUi />
    </LkWrapper>
  );
}
