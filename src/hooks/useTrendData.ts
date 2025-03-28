
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useTrendData() {
  return useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const response = await api.getTrendData();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    }
  });
}
