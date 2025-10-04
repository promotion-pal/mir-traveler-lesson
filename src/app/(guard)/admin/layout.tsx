import { AppSidebarClient } from "@/widgets/admin/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebarClient>{children}</AppSidebarClient>;
}
