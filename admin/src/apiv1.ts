import axios from "axios";
import localStore from "@/utils/localStore";

export const apiV1 = () => {
  // authenticate user if jwt token is in localstore
  if (localStore.getToken()) {
    return axios.create({
      baseURL: `http://localhost:5555/api/v1`,
      headers: {
        Authorization: `Bearer ${localStore.getToken()}`,
      },
    });
  }

  return axios.create({
    baseURL: `http://localhost:5555/api/v1`,
  });
};
