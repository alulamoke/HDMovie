import { apiV1 } from "@/apiv1";

import { z } from "zod";
import { newGenreSchema } from "@/schemas/data-schema";

export default {
  // Config
  getConfig: async () => {
    const response = await apiV1().get(`/config`, {
      params: { type: "admin" },
    });
    return response.data;
  },
  // Genres
  createGenre: async (data: z.infer<typeof newGenreSchema>) => {
    const response = await apiV1().post(`/genre`, data);
    return response.data;
  },
  getGenres: async () => {
    const response = await apiV1().get(`/genre`);
    return response.data;
  },
  deleteGenre: async (id: string) => {
    const response = await apiV1().delete(`/genre/${id}`);
    return response.data;
  },
  // Casts
  getCasts: async () => {
    const response = await apiV1().get(`/cast`);
    return response.data;
  },
  // Customers
  getCustomers: async () => {
    const response = await apiV1().get(`/admin/users`);
    return response.data;
  },
};
