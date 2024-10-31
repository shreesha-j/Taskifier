import axios from 'axios';
import queryString from 'query-string';

const baseUrl = 'http://localhost:5000/api/v1';

/**
 * Retrieves the JWT token from local storage.
 *
 * @returns {string|null} The token if it exists, otherwise null.
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Axios instance pre-configured with base URL and query parameter serialization.
 * @type {AxiosInstance}
 */
const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => queryString.stringify(params),
});

/**
 * Request interceptor to add authorization token to each request.
 * @param {AxiosRequestConfig} config - The configuration of the Axios request.
 * @returns {AxiosRequestConfig} The modified request configuration.
 */
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
});

/**
 * Response interceptor to handle successful responses.
 * Returns only the data portion of the response if available.
 * @param {AxiosResponse} response - The server response.
 * @returns {object|AxiosResponse} The data or the full response.
 */
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  /**
   * Response interceptor to handle errors.
   * If the error lacks a server response, an alert is shown.
   * Otherwise, the error response is thrown.
   * @param {AxiosError} error - The error object from Axios.
   * @returns {Promise<AxiosError>} The error response.
   */
  (error) => {
    if (!error.response) {
      alert(error);
      throw error;
    }
    throw error.response;
  }
);

export default axiosClient;
