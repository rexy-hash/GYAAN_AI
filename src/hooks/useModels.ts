
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { AIModel } from "@/types/api";

// Configure optimal stale times and caching for better performance
const MODELS_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CATEGORY_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const MODEL_DETAIL_STALE_TIME = 10 * 60 * 1000; // 10 minutes

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await api.getModels();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: MODELS_STALE_TIME
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
    enabled: !!id,
    staleTime: MODEL_DETAIL_STALE_TIME
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
    enabled: !!category,
    staleTime: CATEGORY_STALE_TIME
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
    enabled: !!source,
    staleTime: CATEGORY_STALE_TIME
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
    enabled: query.length > 0,
    staleTime: 60 * 1000 // 1 minute for search results
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
    },
    staleTime: 2 * 60 * 1000 // 2 minutes for latest models
  });
}
