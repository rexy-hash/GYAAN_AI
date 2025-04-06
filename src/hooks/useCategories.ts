
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

// Categories don't change often, cache them longer
const CATEGORIES_STALE_TIME = 60 * 60 * 1000; // 60 minutes

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.getCategories();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: CATEGORIES_STALE_TIME
  });
}
