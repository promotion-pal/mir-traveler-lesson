import { LkFooter, LkHeader, ClientLkSidebar } from "@/widgets/lk/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

export default function LkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen wrapper bg-gray-100">
      <main className="grid container pt-10 grid-cols-[20%_78%] justify-between">
        <ClientLkSidebar />
        {children}
      </main>
      <LkFooter />
    </div>
  );
}
