"use server";
import { API_URL } from "@/constants";
import { getHeaders } from "@/lib/fetch";

export async function getProfile() {
  const url = `${API_URL}/users/profile`;

  try {
    const res = await fetch(url, {
      headers: { ...getHeaders() },
      cache: "no-cache",
    });

    const data = await res.json();

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quiz:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error fetching quiz:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
