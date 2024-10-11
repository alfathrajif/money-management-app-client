import Wrapper from "@/components/wrapper";
import { formatCurrency, getRandomAmberHSL } from "@/lib/utils";
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
        <div className="text-2xl font-light">{props.type}</div>
        <div className="text-2xl font-medium">
          {formatCurrency(props.amount, "IDR", "id-ID")}
        </div>
      </Wrapper>
      <div className="flex">
        <ChartPie data={chartData} config={chartConfig} />
        <ScrollArea className={styles.lists}>
          <Wrapper className="pl-0 py-0">
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

export default TransactionChart;
