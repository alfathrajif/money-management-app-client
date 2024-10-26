export interface ISumPaymentMethod {
  name: string;
  income: number;
  expense: number;
  total: number;
}

export interface PaymentMethod {
  uuid: string;
  name: string;
}
