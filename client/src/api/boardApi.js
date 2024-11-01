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

  /**
   * Updates the position of boards.
   * @param {Object} params - Parameters to update board positions.
   * @returns {Promise} The server response.
   */
  updatePositoin: (params) => axiosClient.put('boards', params),

  /**
   * Retrieves a specific board by its ID.
   * @param {string} id - The ID of the board to fetch.
   * @returns {Promise} The server response.
   */
  getOne: (id) => axiosClient.get(`boards/${id}`),
};

export default boardApi;
