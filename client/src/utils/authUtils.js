import AuthApi from '../api/authApi';

/**
 * Utility functions for authentication.
 *
 * @class authUtils
 */
const authUtils = {
  /**
   * Checks if the user is authenticated.
   * Retrieves the token from local storage and verifies it with the server.
   *
   * @returns {Promise<boolean|Object>} Returns the user object if authenticated, otherwise false.
   */
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const res = await AuthApi.verifyToken();
      return res.user;
    } catch (err) {
      return false;
    }
  },
};

export default authUtils;
