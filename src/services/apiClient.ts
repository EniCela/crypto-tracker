/**
 * apiClient is a pre-configured Axios instance for communicating with the CoinGecko API.
 * It sets a base URL, a timeout of 15 seconds, and handles common HTTP errors globally
 * using an interceptor that logs appropriate messages for debugging purposes.
 */

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    console.error("API ERROR:", error?.response || error);
    const status = error?.response?.status;
    switch (status) {
      case 400:
        console.warn("Bad Request");
        break;

      case 401:
        console.warn("Unauthorized");
        break;

      case 404:
        console.warn("Not Found");
        break;

      case 500:
        console.warn("Server Error");
        break;

      default:
        console.warn("Unexpected API error");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
