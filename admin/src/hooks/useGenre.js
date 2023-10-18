import { toast } from 'react-hot-toast';

// React query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import genreService from '../services/genre.service';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: genreService.getGenres,
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createGenre'],
    mutationFn: genreService.createGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast.success('Genre was successfully created.');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteGenre'],
    mutationFn: genreService.deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast.success('Genre deleted successfully.');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};
