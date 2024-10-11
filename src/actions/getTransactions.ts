import { API_URL } from "@/constants/api";
import { getHeaders } from "@/lib/fetch";

export default async function getTransactions() {
  const url = `${API_URL}/transactions`;
  const res = await fetch(url, {
    headers: { ...getHeaders() },
  });
  const data = await res.json();
  return data.data;
}
