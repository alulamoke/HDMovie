import { apiV1 } from "@/apiv1";

import { z } from "zod";
import { loginSchema, signupSchema } from "@/schemas/auth-schema";

export default {
  signup: async (data: z.infer<typeof signupSchema>) => {
    const response = await apiV1().post(`/admin/signup`, data);
    return response.data;
  },

  login: async (data: z.infer<typeof loginSchema>) => {
    const response = await apiV1().post(`/admin/login`, data);
    return response.data;
  },

  getAuthInfo: async () => {
    const response = await apiV1().get(`/admin/auth`);
    return response.data;
  },

  logout: async () => {
    const response = await apiV1().post(`/admin/logout`);
    return response.data;
  },

  logoutInAllDevices: async () => {
    const response = await apiV1().post(`/admin/logoutAll`);
    return response.data;
  },
};
