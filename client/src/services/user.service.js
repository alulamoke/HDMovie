import { appApi } from '../app/appApi';

export default {
  pay: async (body) => {
    const response = await appApi().post(`/user/pay`, body);
    return response.data;
  },

  signup: async (body) => {
    const response = await appApi().post(`/user/signup`, body);
    return response.data;
  },

  login: async (body) => {
    const response = await appApi().post(`/user/login`, body);
    return response.data;
  },

  getLoggedInUserInfo: async () => {
    const response = await appApi().get(`/user/me`);
    return response.data;
  },

  editUserPhoto: async (body) => {
    const response = await appApi().put(`/user/photo`, body);
    return response.data;
  },

  logout: async () => {
    const response = await appApi().post(`/user/logoutAll`);
    return response.data;
  },

  logoutInAllDevices: async () => {
    const response = await appApi().post(`/user/logoutAll`);
    return response.data;
  },
};
