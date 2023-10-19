import { appApi } from '../app/appApi';

export default {
  getConfig: async () => {
    const response = await appApi().get(`/config`, {
      params: { type: 'admin' },
    });
    return response.data;
  },
};
