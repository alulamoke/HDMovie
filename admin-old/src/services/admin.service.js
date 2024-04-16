import { appApi } from '../app/appApi';

export default {
  signup: async (body) => {
    const response = await appApi().post(`/admin/signup`, body);
    return response.data;
  },

  login: async (body) => {
    const response = await appApi().post(`/admin/login`, body);
    return response.data;
  },

  getLoggedInAdminInfo: async () => {
    const response = await appApi().get(`/admin/auth`);
    return response.data;
  },

  getUsers: async () => {
    const response = await appApi().get(`/admin/users`);
    return response.data;
  },

  logout: async () => {
    const response = await appApi().post(`/admin/logoutAll`);
    return response.data;
  },

  logoutInAllDevices: async () => {
    const response = await appApi().post(`/admin/logoutAll`);
    return response.data;
  },
};
