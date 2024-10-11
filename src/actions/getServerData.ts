"use server";
import categoryServices from "@/services/categories";
import transactionServices from "@/services/transaction";

export async function getServerData() {
  const responseCategoriesIncome = await categoryServices.getCategories(
    "income"
  );

  const responseCategoriesExpense = await categoryServices.getCategories(
    "expense"
  );
  const responseTransactions = await transactionServices.getTransactions();

  return {
    categoriesIncome: responseCategoriesIncome.data,
    categoriesExpense: responseCategoriesExpense.data,
    transactions: responseTransactions.data,
  };
}
