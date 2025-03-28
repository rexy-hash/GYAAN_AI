
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.getCategories();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    }
  });
}
