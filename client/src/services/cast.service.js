import { appApi } from '../app/appApi';

export default {
  getCastInfo: async (id) => {
    const response = await appApi().get(`/cast/${id}`);
    return response.data;
  },
};
