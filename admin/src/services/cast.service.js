import { apiV1 } from '../api';

export default {
  createCast: async (body) => {
    const response = await apiV1().post(`/cast`, body);
    return response;
  },
  getCasts: async () => {
    const response = await apiV1().get(`/cast`);
    return response;
  },
  updateCast: async (id, body) => {
    const response = await apiV1().put(`/cast/${id}`, body);
    return response;
  },
  deleteCast: async (id) => {
    const response = await apiV1().delete(`/cast/${id}`);
    return response;
  },
};
