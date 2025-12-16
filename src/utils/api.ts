import { useQuery } from "@tanstack/react-query";

const BASE = import.meta.env.VITE_API_URL;

type ApiResponse = {
  data: ApiItem[];
};

async function fetchApiResponse(): Promise<ApiResponse> {
  if (!BASE) {
    throw new Error("VITE_API_URL is not set");
  }

  const res = await fetch(`${BASE}`);

  if (!res.ok) {
    throw new Error(`Billing request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

type ApiItem = {
  id: number;
  title: string;
};

export function useBilling() {
  return useQuery({
    queryKey: ["billing"],
    queryFn: async (): Promise<ApiItem[]> => {
      const json = await fetchApiResponse();
      return json.data;
    },
  });
}

export function useDashboardBilling() {
  return useQuery({
    queryKey: ["billing", "dashboard"],
    queryFn: async (): Promise<ApiItem | null> => {
      const json = await fetchApiResponse();
      return json.data[0] ?? null;
    },
  });
}
