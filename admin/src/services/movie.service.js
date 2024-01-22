import { appApi } from '../app/appApi';

export default {
  createMovie: async (body) => {
    const response = await appApi().post(`/movie`, body);
    return response.data;
  },
  getBestMovies: async (type) => {
    const response = await appApi().get(`/movie/best/${type}`);
    return response.data;
  },
  getMovieInfo: async (id) => {
    const response = await appApi().get(`/movie/${id}/admin`);
    return response.data;
  },
  updateMovieInfo: async ({ id, body }) => {
    const response = await appApi().put(`/movie/${id}`, body);
    return response.data;
  },
  updateTrailer: async ({ id, body }) => {
    const response = await appApi().put(`/movie/updateTrailer/${id}`, body);
    return response.data;
  },
  updateMovieVideo: async ({ id, body }) => {
    const response = await appApi().put(`/movie/updateVideo/${id}`, body);
    return response.data;
  },
  updateSeriesMovie: async ({ id, body }) => {
    const response = await appApi().put(`/movie/updateSeriesMovie/${id}`, body);
    return response.data;
  },
  getMoviesForAdmin: async (params) => {
    const response = await appApi().get(`/movie/admin`, { params });
    return response.data;
  },
  getMoviesBySearch: async (params) => {
    const response = await appApi().get(`/movie/search`, { params });
    return response.data;
  },
  deleteMovie: async (id) => {
    const response = await appApi().delete(`/movie/${id}`);
    return response.data;
  },
};
