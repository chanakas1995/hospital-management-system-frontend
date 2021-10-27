import axios from "axios";
import store from "../store";

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

HTTP.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
    };
    store.commit("common/ADD_REQUEST");
    return config;
  },
  (error) => Promise.reject(error)
);

HTTP.interceptors.response.use(
  (response) => {
    store.commit("common/REMOVE_REQUEST");
    return response;
  },
  (error) => {
    store.commit("common/REMOVE_REQUEST");
    if (error.response.status === 422) {
      store.commit("common/SET_MESSAGE", {
        type: "error",
        text: Object.keys(error.response.data.data)
          .map((element) => error.response.data.data[element])
          .pop(),
      });
    } else {
      store.commit("common/SET_MESSAGE", {
        type: "error",
        text: error.response.data.message,
      });
    }
    return Promise.reject(error);
  }
);

export default {
  get: (url) =>
    new Promise((resolve, reject) => {
      HTTP.get(url)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data));
    }),

  post: (url, body = null) =>
    new Promise((resolve, reject) => {
      HTTP.post(url, body)
        .then((response) => {
          store.commit("common/SET_MESSAGE", {
            type: "success",
            text: response.data.message,
          });
          resolve(response.data);
        })
        .catch((error) => reject(error));
    }),

  put: (url, body = null) =>
    new Promise((resolve, reject) => {
      HTTP.put(url, body)
        .then((response) => {
          store.commit("common/SET_MESSAGE", {
            type: "success",
            text: response.data.message,
          });
          resolve(response.data);
        })
        .catch((error) => reject(error.response.data));
    }),

  delete: (url) =>
    new Promise((resolve, reject) => {
      HTTP.delete(url)
        .then((response) => {
          store.commit("common/SET_MESSAGE", {
            type: "success",
            text: response.data.message,
          });
          resolve(response.data);
        })
        .catch((error) => reject(error.response.data));
    }),
};
