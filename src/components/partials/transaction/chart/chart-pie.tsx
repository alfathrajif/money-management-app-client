"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IChartConfigCategory, IChartDataCategory } from "@/types";
import * as React from "react";
import { Pie, PieChart } from "recharts";

interface IChartPieProps {
  data: IChartDataCategory[];
  config: IChartConfigCategory;
}

const ChartPie = ({ data, config }: IChartPieProps) => {
  return (
    <Card className="flex flex-col border-none w-9/12">
      <CardContent className="p-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="total_amount"
              nameKey="name"
              innerRadius={70}
              strokeWidth={5}></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartPie;
