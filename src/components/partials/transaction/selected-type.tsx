import { Button } from "@/components/ui/button";
import React from "react";

const SelectedType = ({
  type,
  setType,
}: {
  type: "income" | "expense";
  setType: (option: "income" | "expense") => void;
}) => {
  const handleSelectionType = (option: "income" | "expense") => {
    setType(option);
  };

  return (
    <div className="flex gap-x-1 mb-6">
      <Button
        onClick={() => handleSelectionType("income")}
        className={`h-11 rounded-sm w-full shadow-sm text-secondary-foreground hover:bg-secondary ${
          type === "income" ? "bg-green-800 hover:bg-green-800/80" : ""
        }`}
        variant="outline">
        Income
      </Button>
      <Button
        onClick={() => handleSelectionType("expense")}
        className={`h-11 rounded-sm w-full hover:bg-secondary ${
          type === "expense" ? "bg-red-900 hover:bg-red-900/80" : ""
        }`}
        variant="outline">
        Expense
      </Button>
    </div>
  );
};

export default SelectedType;
