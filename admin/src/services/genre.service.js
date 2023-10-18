import { apiV1 } from '../api';

export default {
  createGenre: async (body) => {
    const response = await apiV1().post(`/genre`, body);
    return response;
  },
  getGenres: async () => {
    const response = await apiV1().get(`/genre`);
    return response;
  },
  deleteGenre: async (id) => {
    const response = await apiV1().delete(`/genre/${id}`);
    return response;
  },
};
