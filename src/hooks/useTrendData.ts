
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

// Trend data doesn't change frequently, cache it longer
const TREND_DATA_STALE_TIME = 30 * 60 * 1000; // 30 minutes

export function useTrendData() {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const response = await api.getTrendData();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: TREND_DATA_STALE_TIME
  });
}
