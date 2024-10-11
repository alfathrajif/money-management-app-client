import instance from "@/lib/axios/instance";

const transactionServices = {
  getTransactions: () =>
    instance
      .get("/transactions")
      .then((response) => response.data)
      .catch((err) => err.response.data),
};

export default transactionServices;
