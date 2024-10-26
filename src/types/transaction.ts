import { ICategory } from ".";
import { PaymentMethod } from "./payment-methods";

export interface Transaction {
  uuid: string;
  category: ICategory;
  payment_method: PaymentMethod;
  type: string; // income | expense
  amount: number;
  description: string;
  date: string;
}

export interface CreateTransaction {
  type: string;
  amount: number;
  description: string;
  date: Date;
  category_name: string;
  payment_method_name: string;
}

export interface UpdateTransaction {
  amount: number;
  description: string;
  date: Date;
  category_name: string;
  payment_method_name: string;
}
