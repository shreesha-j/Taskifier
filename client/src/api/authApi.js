import axiosClient from './axiosClient';

/**
 * API for handling authentication requests.
 *
 * @class AuthApi
 */
const AuthApi = {
  /**
   * Signs up a new user.
   *
   * @param {Object} params - The parameters for the signup request.
   * @param {string} params.email - The email of the user.
   * @param {string} params.password - The password of the user.
   * @param {string} params.name - The name of the user.
   * @returns {Promise<Object>} The server response.
   */
  signup: (params) => {
    return axiosClient.post('/auth/signup', params);
  },

  /**
   * Logs in a user.
   *
   * @param {Object} params - The parameters for the login request.
   * @param {string} params.email - The email of the user.
   * @param {string} params.password - The password of the user.
   * @returns {Promise<Object>} The server response.
   */
  login: (params) => {
    return axiosClient.post('/auth/login', params);
  },

  /**
   * Verifies the user's token.
   *
   * @returns {Promise<Object>} The server response indicating token validity.
   */
  verifyToken: () => {
    return axiosClient.get('/auth/verify-token');
  },
};

export default AuthApi;
