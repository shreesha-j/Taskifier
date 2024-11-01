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

  /**
   * Deletes a specific board by its ID.
   * @param {string} id - The ID of the board to delete.
   * @returns {Promise} The server response.
   */
  delete: (id) => axiosClient.delete(`boards/${id}`),
  /**
   * Updates a specific board by its ID with the provided parameters.
   * @param {string} id - The ID of the board to update.
   * @param {Object} params - The parameters to update the board with.
   * @returns {Promise} The server response.
   */
  update: (id, params) => axiosClient.put(`boards/${id}`, params),

  /**
   * Retrieves all favourite boards for the authenticated user.
   * @returns {Promise} The server response.
   */
  getFavourites: () => axiosClient.get('boards/favourites'),

  /**
   * Updates the favourite positions of multiple boards.
   * @param {Object} params - Parameters containing board IDs and their new favourite positions.
   * @returns {Promise} The server response.
   */
  updateFavouritePosition: (params) => axiosClient.put('boards/favourites', params)
};

export default boardApi;
