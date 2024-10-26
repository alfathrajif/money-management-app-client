import { ISumPaymentMethod } from "./payment-methods";
import { Transaction } from "./transaction";

export interface IAuthRegister {
  name: string;
  email: string;
  password: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}

export interface ICategory {
  uuid: string;
  name: string;
  type: string;
}

export interface IDataCategory extends ICategory {
  transactions: Transaction[];
  total_amount: number;
  percentage?: number;
}

export interface IDataTransaction {
  transactions: Transaction[];
  total_income: number;
  total_expense: number;
  my_pocket: number;
  sum_payment_methods: ISumPaymentMethod[];
}

export interface IChartDataCategory extends IDataCategory {
  fill: string;
}

export interface IChartConfigCategory {
  [x: string]: {
    label?: string;
    color?: string;
  };
}
