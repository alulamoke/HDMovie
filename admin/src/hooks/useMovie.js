import { toast } from 'react-hot-toast';

// React query
import { useQuery } from '@tanstack/react-query';
import movieService from '../services/movie.service';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: movieService.getMoviesForAdmin,
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useMovieInfo = (id) => {
  const { isLoading, data } = useQuery({
    queryKey: ['movieInfo', id],
    queryFn: () => movieService.getMovieInfo(id),
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isLoading, data, seasonNum: data && data.seasons.length };
};
