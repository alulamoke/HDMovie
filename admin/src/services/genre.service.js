import { appApi } from '../app/appApi';

export default {
  createGenre: async (body) => {
    const response = await appApi().post(`/genre`, body);
    return response.data;
  },
  getGenres: async () => {
    const response = await appApi().get(`/genre`);
    return response.data;
  },
  deleteGenre: async (id) => {
    const response = await appApi().delete(`/genre/${id}`);
    return response.data;
  },
};
