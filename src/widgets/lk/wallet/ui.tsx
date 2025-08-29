"use client";

import { CommonDataTable } from "@/entities/common/table";
import { Transactions, walletService } from "@/features/api/lk/wallet";
import { CommonEmpty } from "@/shared/common";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, useState } from "react";
import { useDefinitionUserFn } from "../common/definitionUser";
import { CommonFrom, CommonTextField } from "@/features/form";
import z from "zod";
import { Button } from "@/shared/ui/button";

function TransactionsUi({
  data,
  isLoad,
}: {
  data: Transactions[] | null;
  isLoad: boolean;
}) {
  const tariffTableSettings = [
    {
      id: "1",
      field: "amount" as const,
      headerName: "Сумма",
      align: "center" as const,
    },
    {
      id: "2",
      field: "created_at" as const,
      headerName: "Дата",
      align: "center" as const,
    },
    {
      id: "3",
      field: "description" as const,
      headerName: "Описание",
      align: "center" as const,
    },
    {
      id: "4",
      field: "status" as const,
      headerName: "Статус",
      align: "center" as const,
    },
    {
      id: "5",
      field: "transaction_type" as const,
      headerName: "Тип",
      align: "center" as const,
    },
  ];

  if (isLoad) return <Skeleton className="bg-gray-200 h-32 w-full" />;

  if (!data) return <CommonEmpty />;

  return (
    <CommonDataTable
      className="w-full"
      columns={tariffTableSettings}
      rows={data.map((props) => ({
        ...props,
      }))}
      renderCell={(item, type, props) => {
        switch (type) {
          default:
            return item;
        }
      }}
    />
  );
}

function BalanceUi({
  amount,
  isLoad,
}: {
  amount: string | null;
  isLoad: boolean;
}) {
  if (isLoad) return <Skeleton className="bg-gray-200 h-10 w-36" />;

  return (
    <div>
      <p className="text-gray-300">Баланс, Р</p>
      <p className="text-xl">{amount ? amount : "Ошибка"}</p>
    </div>
  );
}

const ClientWalletUi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transactions[] | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const { user } = useDefinitionUserFn();

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) return;

      setIsLoading(true);

      try {
        const [transactionsRes, balanceRes] = await Promise.all([
          walletService.getTransactions(),
          walletService.getBalance(user.id),
        ]);

        setTransactions(transactionsRes.results);
        setBalance(balanceRes.amount);
      } catch (err) {
        console.error("Wallet data error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [user]);

  return (
    <div className="space-y-6">
      <BalanceUi amount={balance} isLoad={isLoading} />
      <TransactionsUi data={transactions} isLoad={isLoading} />
    </div>
  );
};

const RefillUi = () => {
  const refillSchema = z.object({
    amount: z.string(),
  });

  return (
    <CommonFrom
      schema={refillSchema}
      defaultValues={{ amount: "" }}
      onSubmit={async (data) => {
        await walletService.refillBalance(data.amount);
      }}
    >
      {(form) => (
        <div className="w-[300px]">
          <CommonTextField form={form} name="amount" placeholder="Сумма" />
          <Button className="rounded-full mt-4" type="submit">
            Пополнить
          </Button>
        </div>
      )}
    </CommonFrom>
  );
};

export { ClientWalletUi, RefillUi };
