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
  transactions: ITransaction[];
  total_amount: number;
  percentage?: number;
}

export interface ITransaction {
  uuid: string;
  category: ICategory;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
}

export interface IDataTransaction {
  transactions: ITransaction[];
  total_income: number;
  total_expense: number;
  my_pocket: number;
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
