import { WrapperAuthUi, LineAuthUi, DocAuthUi } from "@/widgets/site/auth";

export default function RegisterPage() {
  return (
    <WrapperAuthUi title="Регистрация">
      page
      <LineAuthUi />
      <DocAuthUi />
    </WrapperAuthUi>
  );
}
