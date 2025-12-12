import { useQuery } from "@tanstack/react-query";

const BASE = import.meta.env.VITE_BILLING_API_URL;

export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export function getBilling() {
  return fetchJson(`${BASE}`);
}

export function useBilling() {
  return useQuery({
    queryKey: ["billing"],
    queryFn: useBilling,
  });
}
