import { api } from "../../fetch";
import { Balance, TransactionsRequest } from "./types";

class WalletService {
  getTransactions(): Promise<TransactionsRequest> {
    return api.getWithToken<TransactionsRequest>("/site/transactions/");
  }
  getBalance(userId: number): Promise<Balance> {
    return api.getWithToken<Balance>(`/site/balance/${userId}/`);
  }
}

export const walletService = new WalletService();
