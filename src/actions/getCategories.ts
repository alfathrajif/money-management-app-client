import { API_URL } from "@/constants";
import { getHeaders } from "@/lib/fetch";

export default async function getCategories(type: string) {
  const url = `${API_URL}/categories?type=${type}`;
  const res = await fetch(url, {
    headers: { ...getHeaders() },
  });
  const data = await res.json();
  return data.data;
}
