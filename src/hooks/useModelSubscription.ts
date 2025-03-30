
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";

export function useSubscribedModels() {
  return useQuery({
    queryKey: ["models", "subscribed"],
    queryFn: async () => {
      const response = await api.getSubscribedModels();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    }
  });
}

export function useModelSubscription() {
  const queryClient = useQueryClient();
  
  const subscribeToModel = useMutation({
    mutationFn: async (modelId: string) => {
      const response = await api.subscribeToModel(modelId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (_, modelId) => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["model", modelId] });
      queryClient.invalidateQueries({ queryKey: ["models", "subscribed"] });
      toast.success("Successfully subscribed to model");
    },
    onError: (error) => {
      toast.error(`Failed to subscribe: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  const unsubscribeFromModel = useMutation({
    mutationFn: async (modelId: string) => {
      const response = await api.unsubscribeFromModel(modelId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (_, modelId) => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
      queryClient.invalidateQueries({ queryKey: ["model", modelId] });
      queryClient.invalidateQueries({ queryKey: ["models", "subscribed"] });
      toast.success("Successfully unsubscribed from model");
    },
    onError: (error) => {
      toast.error(`Failed to unsubscribe: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
  
  return {
    subscribeToModel,
    unsubscribeFromModel
  };
}
