/**
 * Wrapper for axios operations that allow for REST API operations.
 */

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `/api/`
});

const get = <T>(url: string) => {
  return axiosInstance.get<T>(url);
}

const post = <T>(url: string, data: {[id: string]: any}) => {
  return axiosInstance.post<T>(url, data);
}

const put = <T>(url: string, data: {[id: string]: any}) => {
  return axiosInstance.put<T>(url, data);
}

const deleteFn = <T>(url: string) => {
  return axiosInstance.delete<T>(url);
}

export const apiService = {
  get,
  post,
  put,
  delete: deleteFn,
}
