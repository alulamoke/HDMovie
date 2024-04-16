import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import localStore from "@/utils/localStore";

export const useUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: authService.getAuthInfo,
    enabled: localStore.isUserAuthenticated() ? true : false,
  });
};
