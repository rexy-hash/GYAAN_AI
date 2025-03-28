
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { AIModel } from "@/types/api";

export function useModelsBySource(source: AIModel['source']) {
  return useQuery({
    queryKey: ["models", "source", source],
    queryFn: async () => {
      const response = await api.getModelsBySource(source);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!source
  });
}
