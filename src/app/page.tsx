import getCategories from "@/actions/getCategories";
import getTransactions from "@/actions/getTransactions";
import TransactionChart from "@/components/partials/transaction/chart";
import Create from "@/components/partials/transaction/create";
import TransactionCards from "@/components/partials/transaction/transaction-cards";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";
import { formatCurrency } from "@/lib/utils";

export default async function Home() {
  const transactions = await getTransactions();
  const categoriesIncome = await getCategories("income");
  const categoriesExpense = await getCategories("expense");

  return (
    <div className="container mx-auto border-l border-r">
      <div className="flex">
        <div className="w-full">
          <Wrapper className="flex justify-between items-center">
            <div>
              <div className="text-lg font-light">My Pocket</div>
              <div className="text-2xl font-medium">
                {formatCurrency(transactions.my_pocket, "IDR", "id-ID")}
              </div>
            </div>
            <Create />
          </Wrapper>
          <TransactionCards transactions={transactions.transactions} />
        </div>
        <Separator
          orientation="vertical"
          style={{ minHeight: "calc(100vh - 4.6rem)" }}
        />
        <div
          className="w-full max-w-xl"
          style={{ minHeight: "calc(100vh - 4.6rem)" }}>
          <TransactionChart
            categories={categoriesIncome}
            type="Income"
            amount={transactions.total_income}
          />
          <Separator className="w-full" orientation="horizontal" />
          <TransactionChart
            categories={categoriesExpense}
            type="Expense"
            amount={transactions.total_expense}
          />
        </div>
      </div>
    </div>
  );
}
