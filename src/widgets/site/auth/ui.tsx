import { ROUTE } from "@/shared/config/path";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface WrapperAuthUiProps {
  title: string;
  children: ReactNode;
}
function WrapperAuthUi({ title, children }: WrapperAuthUiProps) {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <section className="max-w-[460px] shadow-lg p-4 rounded-xl w-fit">
        <p className="text-[#5DD241] font-bold text-2xl text-center">{title}</p>
        {children}
      </section>
    </div>
  );
}
WrapperAuthUi.displayName = "WrapperAuthUi";

const DocAuthUi = () => (
  <p className="text-sm">
    Авторизуясь, вы соглашаетесь c{" "}
    <Link href={ROUTE.DOCUMENTS.PERSON_DATA} className="underline">
      обработкой персональных данных
    </Link>{" "}
    и{" "}
    <Link href={ROUTE.DOCUMENTS.USER_AGREE} className="underline">
      условиями пользовательских соглашений
    </Link>
  </p>
);
DocAuthUi.displayName = "DocAuthUi";

const LineAuthUi = () => (
  <div className="bg-gray-300 mt-8 mb-5 rounded-full w-10/12 h-[2px] mx-auto" />
);
LineAuthUi.displayName = "LineAuthUi";

const BtnAuthUi = ({ action }: { action: string }) => (
  <Button size="lg" type="submit" className="rounded-full text-lg mt-5 w-full">
    {action}
  </Button>
);

export { WrapperAuthUi, DocAuthUi, LineAuthUi, BtnAuthUi };
