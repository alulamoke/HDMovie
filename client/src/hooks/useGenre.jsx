import { toast } from 'react-hot-toast';

// React query
import { useQuery } from '@tanstack/react-query';
import configService from '../services/config.service';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: configService.getGenres,
    onError: (err) => toast.error(err.response.data.message),
  });
};
