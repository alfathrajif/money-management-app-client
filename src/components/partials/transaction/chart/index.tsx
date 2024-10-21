import Wrapper from "@/components/wrapper";
import { cn, formatCurrency, getRandomAmberHSL } from "@/lib/utils";
import React from "react";
import ChartPie from "./chart-pie";
import ChartList from "./chart-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import styles from "./chart.module.css";
import { ChartConfig } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
  IChartConfigCategory,
  IChartDataCategory,
  IDataCategory,
} from "@/types";
import getCategories from "@/actions/getCategories";

interface TransactionChartProps {
  categories: IDataCategory[];
  type: string;
  amount: number;
}

const TransactionChart = ({ ...props }: TransactionChartProps) => {
  const chartData: IChartDataCategory[] = props.categories.map((item) => ({
    ...item,
    fill: `var(--color-${item.name.replace(/\s+/g, "-")})`,
  }));

  const chartConfig = props.categories.reduce(
    (config: IChartConfigCategory, item) => {
      config[item.name.replace(/\s+/g, "-")] = {
        label: item.name,
        color: getRandomAmberHSL(),
      };
      return {
        amount: {
          label: "Amount",
        },
        ...config,
      };
    },
    {}
  ) satisfies ChartConfig;

  const totalCategoriesAmount = props.categories.reduce(
    (total, item) => total + item.total_amount,
    0
  );

  const categoryTransactions: IDataCategory[] = props.categories.map(
    (item) => ({
      ...item,
      percentage: parseFloat(
        ((item.total_amount / totalCategoriesAmount) * 100).toFixed(2)
      ),
    })
  );

  return (
    <div className="h-1/2">
      <Wrapper className="flex justify-between items-center border-b h-[55px]">
        <div className="text-xl xl:text-2xl font-light">{props.type}</div>
        <div className="text-xl xl:text-2xl font-medium">
          {formatCurrency(props.amount, "IDR", "id-ID")}
        </div>
      </Wrapper>
      <div className="flex flex-col xl:flex-row">
        <ChartPie data={chartData} config={chartConfig} />
        <ScrollArea className={styles.lists}>
          <Wrapper className="xl:pl-0 py-2 px-4 xl:px-6">
            {categoryTransactions.map((item, index) => {
              return (
                <React.Fragment key={item.name}>
                  <ChartList
                    percentage={item.percentage || 0}
                    category={item.name}
                    amount={item.total_amount}
                    color={chartConfig[item.name.replace(/\s+/g, "-")].color}
                  />
                  {index < categoryTransactions.length - 1 && (
                    <Separator className="w-full" orientation="horizontal" />
                  )}
                </React.Fragment>
              );
            })}
          </Wrapper>
        </ScrollArea>
      </div>
    </div>
  );
};

interface ChartProps {
  totalIncome: number;
  totalExpense: number;
  className?: string;
}

const Chart = async ({ totalIncome, totalExpense, className }: ChartProps) => {
  const categoriesIncome = await getCategories("income");
  const categoriesExpense = await getCategories("expense");
  return (
    <div
      className={cn("w-full sm:max-w-xs xl:max-w-lg 2xl:max-w-xl", className)}
      style={{ minHeight: "calc(100vh - 4.6rem)" }}>
      <TransactionChart
        categories={categoriesIncome}
        type="Income"
        amount={totalIncome}
      />
      <Separator className="w-full" orientation="horizontal" />
      <TransactionChart
        categories={categoriesExpense}
        type="Expense"
        amount={totalExpense}
      />
    </div>
  );
};

export default Chart;
