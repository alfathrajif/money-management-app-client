import instance from "@/lib/axios/instance";

interface CreateTransaction {
  category_name: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: Date;
}

interface UpdateTransaction {
  category_name: string;
  amount: number;
  description: string;
  date: Date;
}

const transactionServices = {
  getTransactions: () =>
    instance
      .get("/transactions")
      .then((response) => response.data)
      .catch((err) => err.response.data),
  createTransaction: (data: CreateTransaction) =>
    instance
      .post("/transactions", data)
      .then((response) => response.data)
      .catch((err) => err.response.data),
  updateTransaction: (data: UpdateTransaction, uuid: string) =>
    instance
      .put(`/transactions/${uuid}`, data)
      .then((response) => response.data)
      .catch((err) => err.response.data),
  deleteTransaction: (uuid: string) =>
    instance
      .delete(`/transactions/${uuid}`)
      .then((response) => response.data)
      .catch((err) => err.response.data),
};

export default transactionServices;
