import { toast } from 'react-hot-toast';

// React query
import { useQuery, useMutation } from '@tanstack/react-query';
import movieService from '../services/movie.service';

export const useBestMovies = (type) => {
  return useQuery({
    queryKey: ['bestMovies'],
    queryFn: () => movieService.getBestMovies(type),
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useBestSeries = (type) => {
  return useQuery({
    queryKey: ['bestSeries'],
    queryFn: () => movieService.getBestMovies(type),
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useMovies = (page = 1, sort_by) => {
  const params = {
    page,
    sort_by,
  };
  return useQuery({
    queryKey: ['movies', page, sort_by],
    queryFn: () => movieService.getMoviesForAdmin(params),
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useMovieInfo = (id) => {
  const { isLoading, data } = useQuery({
    queryKey: ['movieInfo', id],
    queryFn: () => movieService.getMovieInfo(id),
    onError: (err) => toast.error(err.response.data.message),
    enabled: id ? true : false,
  });

  return { isLoading, data, seasonNum: data && data.seasons.length };
};

export const useSearchMovies = (query, page) => {
  const params = {
    q: query,
    page,
  };

  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => movieService.getMoviesBySearch(params),
    onError: (err) => toast.error(err.response.data.message),
    enabled: query ? true : false,
  });
};

export const useCreateMovie = () => {
  return useMutation({
    mutationKey: ['createMovie'],
    mutationFn: movieService.createMovie,
    onSuccess: () => toast.success('Movie created successfully.'),
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useUpdateMovie = () => {
  return useMutation({
    mutationKey: ['updateMovie'],
    mutationFn: movieService.updateMovieInfo,
    onSuccess: () => toast.success('Movie updated successfully.'),
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useDeleteMovie = () => {
  return useMutation({
    mutationKey: ['deleteMovie'],
    mutationFn: movieService.deleteMovie,
    onSuccess: () => toast.success('Movie deleted successfully.'),
    onError: (err) => toast.error(err.response.data.message),
  });
};
