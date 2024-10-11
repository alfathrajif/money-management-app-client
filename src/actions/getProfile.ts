import { API_URL } from "@/constants/api";
import { getHeaders } from "@/lib/fetch";
import { IProfile } from "@/types/user";

export default async function getProfile(): Promise<IProfile> {
  const url = `${API_URL}/users/profile`;
  const res = await fetch(url, {
    headers: { ...getHeaders() },
  });
  const data = await res.json();
  return data.data;
}
