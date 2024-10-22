import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toastError } from "../../component/Toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const unAuthorizedStatus = [401];
const nonValidatedRoutes = ["/", "/login"];

const validateRouteCheck = (route: string): boolean => {
  let validationToggle = false;
  const routeCheck = nonValidatedRoutes.find(
    (_route: string) => _route === route
  );
  if (routeCheck) validationToggle = true;
  return validationToggle;
};

const Axios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!validateRouteCheck(window.location.pathname)) {
      if (unAuthorizedStatus?.includes(401)) {
        // Cookies.remove("refreshToken", { path: "/" });
        // Cookies.remove("accessToken", { path: "/" });
        // window.location.href = '/';
        toastError(`${error?.code} `);
      }
    }
    return Promise.reject(error);
  }
);

const setRefreshToken = (token: string) => {
  Cookies.set("refreshToken", token);
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

const purgeRefreshToken = () => {
  Cookies.remove("refreshToken", { path: "/" });
};

const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token);
};

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const purgeAccessToken = () => {
  Cookies.remove("accessToken", { path: "/" });
};

const getHeaders = () => {
  return {
    Authorization: `${getAccessToken()}`,
  };
};

const getWithoutBase = (url: string, config = {}): Promise<AxiosResponse> => {
  return Axios({
    method: "get",
    url,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const get = (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "get",
    url,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const setUserDetail = (data: string) => {
  Cookies.set("user", data);
};
const getUserDetail = () => {
  return Cookies.get("user");
};

const post = (
  url: string,
  data = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "post",
    url,
    data,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const put = (
  url: string,
  data = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "put",
    url,
    data,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const patch = (
  url: string,
  data = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "patch",
    url,
    data,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const _delete = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "delete",
    url,
    data: data,
    headers: getAccessToken() ? getHeaders() : {},
    ...config,
  });
};

const mediaUpload = (
  url: string,
  data = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return Axios({
    method: "post",
    url,
    data,
    headers: getAccessToken()
      ? { ...getHeaders(), "Content-Type": "multipart/form-data" }
      : {},
    ...config,
  });
};

const request = (config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  return Axios(config);
};

const getCompanyName = () => {
  if (typeof localStorage !== "undefined")
   return localStorage?.getItem("user_company");
};
const setCompanyName = (company: string) => {
  if (typeof localStorage !== "undefined")
    return localStorage?.setItem("user_company", company);
};
const setCompanyId = (id: string) => {
  if (typeof localStorage !== "undefined")
    return localStorage?.setItem("company_id", id);
};

export const apiService = {
  setRefreshToken,
  getRefreshToken,
  purgeRefreshToken,
  setAccessToken,
  getAccessToken,
  purgeAccessToken,
  getHeaders,
  getWithoutBase,
  get,
  post,
  put,
  patch,
  _delete,
  mediaUpload,
  request,
  setUserDetail,
  getUserDetail,
  setCompanyId,
  setCompanyName,
  getCompanyName,
};
