import { useQuery } from "@tanstack/react-query";
import dataService from "@/services/data.service";

export const useConfig = () => {
  return useQuery({
    queryKey: ["config"],
    queryFn: dataService.getConfig,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: dataService.getGenres,
  });
};

export const useCasts = () => {
  return useQuery({
    queryKey: ["casts"],
    queryFn: dataService.getCasts,
  });
};
export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: dataService.getCustomers,
  });
};
