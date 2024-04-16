import { appApi } from '../app/appApi';

export default {
  createCast: async (body) => {
    const response = await appApi().post(`/cast`, body);
    return response.data;
  },
  getCasts: async () => {
    const response = await appApi().get(`/cast`);
    return response.data;
  },
  updateCast: async ({ id, body }) => {
    const response = await appApi().put(`/cast/${id}`, body);
    return response.data;
  },
  deleteCast: async (id) => {
    const response = await appApi().delete(`/cast/${id}`);
    return response.data;
  },
};
