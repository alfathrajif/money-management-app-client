import { formatCurrency, formatDate } from "@/lib/utils";
import { ICategory } from "@/types";
import React from "react";

interface TransactionCardProps {
  category: ICategory;
  type: string;
  amount: number;
  description: string;
  date: string;
}

const TransactionCard = ({ ...props }: TransactionCardProps) => {
  let styles;
  switch (props.type) {
    case "income":
      styles = "bg-green-600/20 text-green-500";
      break;
    case "expense":
      styles = "bg-red-600/20 text-red-500";
    default:
      break;
  }

  return (
    <div className="border rounded-lg p-4 px-5 flex flex-col justify-between gap-y-3">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="capitalize">{props.category.name}</div>
          <div
            className={`capitalize text-xs border-none p-1 px-2 rounded ${styles}`}>
            {props.type}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-xl font-medium">
            {formatCurrency(props.amount, "IDR", "id-ID")}
          </p>
          <p className="line-clamp-2 text-muted-foreground text-xs">
            {props.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end text-xs font-light">
        {formatDate(props.date)}
      </div>
    </div>
  );
};

export default TransactionCard;
