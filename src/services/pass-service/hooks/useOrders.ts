import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { passesService } from "../api/passesApi";
import type { DataForApi } from "../components/PassForm";
import type { UserRole } from "../../../types/services";

export const useOrders = (type: UserRole) => {
  return useQuery({
    queryKey: [`${type}-order-list`],
    queryFn: () => passesService.getOrders(type),
  });
};

export const useApproveOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => passesService.approveOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-order-list"] });
      queryClient.invalidateQueries({ queryKey: ["staff-order-list"] });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DataForApi) => passesService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-order-list"] });
      queryClient.invalidateQueries({ queryKey: ["staff-order-list"] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => passesService.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-order-list"] });
      queryClient.invalidateQueries({ queryKey: ["staff-order-list"] });
    },
  });
};
