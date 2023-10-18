import { apiV1 } from '../api';

export default {
  createMovie: async (body) => {
    const response = await apiV1().post(`/movie`, body);
    return response;
  },
  updateMovieInfo: async (id, body) => {
    const response = await apiV1().put(`/movie/${id}`, body);
    return response;
  },
  updateTrailer: async (id, body) => {
    const response = await apiV1().put(`/movie/updateTrailer/${id}`, body);
    return response;
  },
  updateMovieVideo: async (id, body) => {
    const response = await apiV1().put(`/movie/updateVideo/${id}`, body);
    return response;
  },
  updateSeriesMovie: async (id, body) => {
    const response = await apiV1().put(`/movie/updateSeriesMovie/${id}`, body);
    return response;
  },
  getMoviesForAdmin: async (params) => {
    const response = await apiV1().get(`/movie/admin`, { params });
    return response;
  },
  getMoviesBySearch: async (params) => {
    const response = await apiV1().get(`/movie/search`, { params });
    return response;
  },
  deleteMovie: async (id) => {
    const response = await apiV1().delete(`/movie/${id}`);
    return response;
  },
};
