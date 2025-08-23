"use client";

import { CommonTabs, TabItem } from "@/entities/common/tab";
import { LkWrapper } from "@/entities/lk/wrapper";
import { ClientWalletUi } from "@/widgets/lk/wallet/ui";

export default function page() {
  const WALLET_TABS: TabItem<"balance" | "refill">[] = [
    {
      label: "История операций",
      value: "balance",
    },
    {
      label: "Пополнение кошелька",
      value: "refill",
    },
  ] as const;

  return (
    <LkWrapper title="Мой баланс">
      <CommonTabs initialTab="balance" tabs={WALLET_TABS}>
        {(activeTab) => activeTab === "balance" && <ClientWalletUi />}
      </CommonTabs>
    </LkWrapper>
  );
}
