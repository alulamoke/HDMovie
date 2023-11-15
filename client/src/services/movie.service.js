import { appApi } from '../app/appApi';

export default {
  // getting movie info
  getMoviesByParams: async (params) => {
    const response = await appApi().get(`/movie`, { params });
    return response.data;
  },
  getMoviesByDiscover: async ({ name, params }) => {
    const response = await appApi().get(`/movie/discover/${name}`, { params });
    return response.data;
  },
  getMoviesBySearch: async (params) => {
    const response = await appApi().get(`/movie/search`, { params });
    return response.data;
  },
  getMovieById: async (id) => {
    const response = await appApi().get(`/movie/${id}`);
    return response.data;
  },
  getRecommendationMovies: async (id, params) => {
    const response = await appApi().get(`/movie/${id}/recommendations`, {
      params,
    });
    return response.data;
  },

  // movie actions
  likeMovie: async (id) => {
    const response = await appApi().post(`/movie/${id}/like`);
    return response.data;
  },
  clearFavoriteMovies: async () => {
    const response = await appApi().patch(`/movie/clearFavoriteMovies`);
    return response.data;
  },
  watchLater: async (id) => {
    const response = await appApi().post(`/movie/${id}/watchLater`);
    return response.data;
  },
  clearWatchLaterMovies: async () => {
    const response = await appApi().patch(`/movie/clearWatchLaterMovies`);
    return response.data;
  },
  rateMovie: async ({ id, value }) => {
    const response = await appApi().post(`/movie/${id}/rateMovie`, { value });
    return response.data;
  },
  addReview: async (id, body) => {
    const response = await appApi().post(`/movie/${id}/addReview`, body);
    return response.data;
  },
  deleteSpecificReview: async (movieId, reviewId) => {
    const response = await appApi().delete(`/movie/${movieId}/${reviewId}`);
    return response.data;
  },
};
