import { getTransactions } from "@/actions/transaction";
import Create from "@/components/partials/transaction/create";
import TransactionCards from "@/components/partials/transaction/transaction-cards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
          <Wrapper className="p-5 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-light capitalize">
                  Total Balance
                </div>
                <div className="text-2xl font-medium">
                  {formatCurrency(dataTransaction.my_pocket, "IDR", "id-ID")}
                </div>
              </div>
              <Create />
            </div>
          </Wrapper>
          <ScrollArea className="w-full sm:max-w-xs md:max-w-md lg:max-w-[700px] xl:max-w-3xl 2xl:max-w-[957px] whitespace-nowrap">
            <Wrapper className="flex items-center p-5 pt-0">
              {dataTransaction.sum_payment_methods.map(
                (paymentMethod, index) => (
                  <>
                    <div
                      key={index}
                      className="flex text-sm items-center gap-x-2">
                      <div className="capitalize ">{paymentMethod.name}</div>
                      <div className="text-muted-foreground">
                        {formatCurrency(paymentMethod.total, "IDR", "id-ID")}
                      </div>
                    </div>
                    {index !==
                      dataTransaction.sum_payment_methods.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className="h-4 mx-3 border border-foreground"
                      />
                    )}
                  </>
                )
              )}
            </Wrapper>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <ScrollArea className={styles.scrollArea}>
            <TransactionCards transactions={dataTransaction.transactions} />
            <Separator orientation="horizontal" className="flex sm:hidden" />
            <Wrapper className="p-5 block sm:hidden">
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
