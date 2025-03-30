
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { AIModel } from "@/types/api";

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await api.getModels();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    }
  });
}

export function useModelById(id: string) {
  return useQuery({
    queryKey: ["model", id],
    queryFn: async () => {
      const response = await api.getModelById(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!id
  });
}

export function useModelsByCategory(category: string) {
  return useQuery({
    queryKey: ["models", "category", category],
    queryFn: async () => {
      const response = await api.getModelsByCategory(category);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!category
  });
}

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

export function useSearchModels(query: string) {
  return useQuery({
    queryKey: ["models", "search", query],
    queryFn: async () => {
      const response = await api.searchModels(query);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: query.length > 0
  });
}

export function useLatestModels() {
  return useQuery({
    queryKey: ["models", "latest"],
    queryFn: async () => {
      const response = await api.getLatestModels();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    }
  });
}
