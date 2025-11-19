import apiClient from "./apiClient";
import { AxiosRequestConfig } from "axios";

export const getApi = async <T = any>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
