import React from "react";
import TransactionCard from "@/components/partials/transaction/transaction-card";
import Wrapper from "@/components/wrapper";
import { Transaction } from "@/types/transaction";

const TransactionCards = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <>
      {transactions.length === 0 ? (
        <div className="text-lg italic text-center text-muted-foreground h-full items-center justify-center flex">
          No transactions yet...
        </div>
      ) : (
        <Wrapper className="p-5 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.uuid} {...transaction} />
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default TransactionCards;
