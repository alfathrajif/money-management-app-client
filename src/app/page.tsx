import { getTransactions } from "@/actions/transaction";
import Create from "@/components/partials/transaction/create";
import TransactionCards from "@/components/partials/transaction/transaction-cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/wrapper";
import { formatCurrency } from "@/lib/utils";
import styles from "./home.module.css";
import Chart from "@/components/partials/transaction/chart";

export default async function Home() {
  const dataTransaction = await getTransactions();

  return (
    <div className="container mx-auto border-l border-r">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full">
          <Wrapper className="flex justify-between items-center">
            <div>
              <div className="text-lg font-light">My Pocket</div>
              <div className="text-2xl font-medium">
                {formatCurrency(dataTransaction.my_pocket, "IDR", "id-ID")}
              </div>
            </div>
            <Create />
          </Wrapper>
          <ScrollArea className={styles.scrollArea}>
            <TransactionCards transactions={dataTransaction.transactions} />
            <Separator orientation="horizontal" className="flex sm:hidden" />
            <Wrapper className="p-4 block sm:hidden">
              <Chart
                className="border rounded-lg"
                totalIncome={dataTransaction.total_income}
                totalExpense={dataTransaction.total_expense}
              />
            </Wrapper>
          </ScrollArea>
        </div>
        <Separator
          orientation="vertical"
          className="hidden sm:flex"
          style={{ minHeight: "calc(100vh - 4.6rem)" }}
        />
        <Chart
          className="hidden sm:block"
          totalIncome={dataTransaction.total_income}
          totalExpense={dataTransaction.total_expense}
        />
      </div>
    </div>
  );
}
