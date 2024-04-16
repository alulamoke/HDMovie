import { toast } from 'react-hot-toast';

// React query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import castService from '../services/cast.service';

export const useCasts = () => {
  return useQuery({
    queryKey: ['casts'],
    queryFn: castService.getCasts,
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useCreateCast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createCast'],
    mutationFn: castService.createCast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casts'] });
      toast.success('Cast was successfully created.');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useUpdateCast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateCast'],
    mutationFn: castService.updateCast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casts'] });
      toast.success('Cast updated successfully.');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useDeleteCast = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteCast'],
    mutationFn: castService.deleteCast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casts'] });
      toast.success('Cast deleted successfully.');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};
