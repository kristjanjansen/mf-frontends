import { useQuery } from "@tanstack/react-query";

const BASE = import.meta.env.VITE_BILLING_API_URL;

export async function getBilling() {
  const res = await fetch(`${BASE}`, { credentials: "include" });

  if (!res.ok) {
    throw new Error(`Billing request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export function useBilling() {
  return useQuery({
    queryKey: ["billing"],
    queryFn: getBilling,
  });
}
