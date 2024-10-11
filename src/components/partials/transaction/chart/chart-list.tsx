import { formatCurrency } from "@/lib/utils";
import React from "react";

interface ChartListProps {
  percentage: number;
  category: string;
  amount: number;
  color?: string;
}

const ChartList = ({ percentage, category, amount, color }: ChartListProps) => {
  return (
    <div className="flex justify-between w-full text-sm py-1.5">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div>{percentage}%</div>
      </div>
      <div className="text-right">
        <div className="capitalize">{category}</div>
        <div className="text-xs text-muted-foreground">
          {formatCurrency(amount, "IDR", "id-ID")}
        </div>
      </div>
    </div>
  );
};

export default ChartList;
