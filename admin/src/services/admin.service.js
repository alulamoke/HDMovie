import { apiV1 } from '../api';

export default {
  signup: async (body) => {
    const response = await apiV1().post(`/admin/signup`, body);
    return response;
  },

  login: async (body) => {
    const response = await apiV1().post(`/admin/login`, body);
    return response;
  },

  getLoggedInAdminInfo: async () => {
    const response = await apiV1().get(`/admin/me`);
    return response;
  },

  getUsers: async () => {
    const response = await apiV1().get(`/admin/users`);
    return response;
  },

  logout: async () => {
    const response = await apiV1().post(`/admin/logoutAll`);
    return response;
  },

  logoutInAllDevices: async () => {
    const response = await apiV1().post(`/admin/logoutAll`);
    return response;
  },
};
