import { appApi } from '../app/appApi';

export default {
  getConfig: async () => {
    const response = await appApi().get(`/config`, {
      params: { type: 'user' },
    });
    return response.data;
  },
  getGenres: async () => {
    const response = await appApi().get(`/genre`);
    return response.data;
  },
};
