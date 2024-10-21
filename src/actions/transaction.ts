"use server";
import { API_URL } from "@/constants";
import { getHeaders } from "@/lib/fetch";
import transactionServices from "@/services/transaction";
import { IDataTransaction } from "@/types";

interface CreateTransaction {
  type: "income" | "expense";
  amount: number;
  description: string;
  date: Date;
  category_name: string;
}

interface UpdateTransaction {
  amount: number;
  description: string;
  date: Date;
  category_name: string;
}

export async function createTransaction(payload: CreateTransaction) {
  try {
    const result = await transactionServices.createTransaction(payload);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getTransactions(): Promise<IDataTransaction> {
  const url = `${API_URL}/transactions`;
  const res = await fetch(url, {
    headers: { ...getHeaders() },
  });
  const data = await res.json();
  return data.data;
}

export async function updateTransaction(
  payload: UpdateTransaction,
  uuid: string
) {
  try {
    const result = await transactionServices.updateTransaction(
      {
        amount: payload.amount,
        description: payload.description,
        date: payload.date,
        category_name: payload.category_name,
      },
      uuid
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deleteTransaction(uuid: string) {
  try {
    const result = await transactionServices.deleteTransaction(uuid);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}