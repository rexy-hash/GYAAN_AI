
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";

const SUBSCRIPTION_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useSubscribedModels() {
  return useQuery({
    queryKey: ["models", "subscribed"],
    queryFn: async () => {
      const response = await api.getSubscribedModels();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: SUBSCRIPTION_STALE_TIME
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
      // Only invalidate necessary queries
      queryClient.invalidateQueries({ queryKey: ["models", "subscribed"] });
      queryClient.invalidateQueries({ queryKey: ["model", modelId] });
      
      // Update models cache without refetching
      queryClient.setQueryData(["models"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((model: any) => 
          model.id === modelId ? { ...model, isSubscribed: true } : model
        );
      });
      
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
      // Only invalidate necessary queries
      queryClient.invalidateQueries({ queryKey: ["models", "subscribed"] });
      queryClient.invalidateQueries({ queryKey: ["model", modelId] });
      
      // Update models cache without refetching
      queryClient.setQueryData(["models"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((model: any) => 
          model.id === modelId ? { ...model, isSubscribed: false } : model
        );
      });
      
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
