import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import localStore from '../utils/localStore';

// React query
import { useMutation, useQuery } from '@tanstack/react-query';
import adminService from '../services/admin.service';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: adminService.getUsers,
    onError: (err) => toast.error(err.response.data.message),
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: adminService.logout,
    onSuccess: () => {
      toast.success('User logged out successfully.');
      localStore.deauthenticateUser();
      navigate('/');
    },
    onError: (err) => toast.error(err.response.data.message),
  });
};
