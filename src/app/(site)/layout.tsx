import { Footer, Header } from "@/widgets/site/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мир",
  description: "Актуальные объявления",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
