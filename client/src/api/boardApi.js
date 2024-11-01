import axiosClient from './axiosClient';

/**
 * API endpoints for board-related operations.
 */
const boardApi = {
  /**
   * Creates a new board.
   * @returns {Promise} The server response.
   */
  create: () => axiosClient.post('boards'),

  /**
   * Fetches all boards for the authenticated user.
   * @returns {Promise} The server response.
   */
  getAll: () => axiosClient.get('boards'),
};

export default boardApi;
