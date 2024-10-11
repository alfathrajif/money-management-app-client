import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionCard from "@/components/partials/transaction/transaction-card";
import Wrapper from "@/components/wrapper";
import styles from "./transaction-cards.module.css";
import { ITransaction } from "@/types";

const TransactionCards = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  return (
    <ScrollArea className={styles.scrollArea}>
      {transactions.length === 0 ? (
        <div className="text-lg italic text-center text-muted-foreground h-full items-center justify-center flex">
          No transactions yet...
        </div>
      ) : (
        <Wrapper className="grid grid-cols-3 gap-6">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.uuid}
              category={transaction.category}
              type={transaction.type}
              amount={transaction.amount}
              description={transaction.description}
              date={transaction.date}
            />
          ))}
        </Wrapper>
      )}
    </ScrollArea>
  );
};

export default TransactionCards;
