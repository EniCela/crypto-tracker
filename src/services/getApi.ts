/**
 * getApi is a reusable helper function for making GET requests using the pre-configured apiClient.
 * It accepts a URL and optional Axios config, performs the GET request, and returns the response data.
 * Errors are propagated to be handled by the caller.
 */

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
