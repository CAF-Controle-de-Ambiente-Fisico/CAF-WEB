import axios from "axios";
import qs from "qs";

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const api = axios.create({
  baseURL: `http://0.0.0.0:3332`,
});

// api.interceptors.request.use(async (config) => {
//   config.headers.Accept = "*/*";
//   return config;
// });

export { api };
