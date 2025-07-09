import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "./cookies";

const API_BASE: string = import.meta.env.VITE_API_BASE_URL as string;
const API_KEY: string = import.meta.env.VITE_API_KEY as string;
const API_SECRET: string = import.meta.env.VITE_API_SECRET as string;

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use(async (config: AxiosRequestConfig) => {
  let token: string | undefined = getCookie("access_token");
  if (!token) {
    // fetch new token
    const { data } = await axios.get<{
      access_token: string;
      token_expiry?: number;
    }>(`${API_BASE}/api/integrations/get_access_token/`, {
      params: {
        api_key: API_KEY,
        api_secret: API_SECRET,
      },
    });
    token = data?.access_token ?? "";
    setCookie("access_token", token, { path: "/", maxAge: data.token_expiry });
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  return config;
});

export default client;
