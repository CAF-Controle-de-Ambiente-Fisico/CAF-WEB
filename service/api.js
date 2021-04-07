import axios from "axios";
// import qs from "qs";

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const api = axios.create({
  baseURL: `http://localhost:3332`,
});

api.interceptors.request.use(async (config) => {
  config.headers.Accept = "*/*";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default api;
