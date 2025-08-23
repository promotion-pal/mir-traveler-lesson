import { CommonReqList } from "../../types";

export interface TransactionsRequest extends CommonReqList {
  results: Transactions[];
}
export interface Transactions {
  amount: string;
  transaction_type: "replenishment";
  description: string;
  status: "success";
  created_at: string;
}

export interface Balance {
  amount: string;
}
