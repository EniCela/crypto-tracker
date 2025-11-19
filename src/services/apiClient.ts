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
