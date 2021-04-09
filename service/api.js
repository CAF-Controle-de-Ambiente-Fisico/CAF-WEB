import axios from "axios";
import qs from "qs";
import { getSession } from "next-auth/client";

axios.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "brackets" });

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.token !== undefined)
    config.headers.Authorization = `Bearer ${session.user.token}`;
  return config;
});

const nextAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SITE_URL}`,
});

export { api, nextAuth };
