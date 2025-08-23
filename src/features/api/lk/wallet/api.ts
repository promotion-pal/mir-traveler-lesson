import { api } from "../../fetch";
import { Balance, TransactionsRequest } from "./types";

class WalletService {
  async getTransactions(): Promise<TransactionsRequest> {
    return api.getWithToken<TransactionsRequest>("/site/transactions/");
  }
  async getBalance(userId: number): Promise<Balance> {
    return api.getWithToken<Balance>(`/site/balance/${userId}/`);
  }
  async refillBalance(amount: number) {
    return api.postWithToken<Balance>("/site/transactions/", { amount });
  }
}

export const walletService = new WalletService();
