"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IChartConfigCategory, IChartDataCategory } from "@/types";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

interface IChartPieProps {
  data: IChartDataCategory[];
  config: IChartConfigCategory;
}

const ChartPie = ({ data, config }: IChartPieProps) => {
  const [innerRadius, setInnerRadius] = useState(70);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setInnerRadius(70); // Untuk layar kecil (mobile)
      } else if (window.innerWidth >= 1280) {
        setInnerRadius(50); // Untuk layar medium (tablet)
      } else {
        setInnerRadius(40); // Untuk layar besar (desktop)
      }
    };

    handleResize(); // Set nilai saat pertama kali di-render
    window.addEventListener("resize", handleResize); // Update nilai saat layar diubah ukurannya

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="flex flex-col border-none w-full xl:w-9/12">
      <CardContent className="p-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[180px] xl:max-h-[200px] 2xl:max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="total_amount"
              nameKey="name"
              innerRadius={innerRadius}
              strokeWidth={5}></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartPie;
