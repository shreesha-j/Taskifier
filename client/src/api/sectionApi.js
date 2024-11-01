/**
 * API endpoints for section-related operations.
 */
const sectionApi = {
  /**
   * Creates a new section for a specific board.
   * @param {string} boardId - The ID of the board to create a section for.
   * @returns {Promise} The server response.
   */
  create: (boardId) => axiosClient.post(`boards/${boardId}/sections`),
  /**
   * Updates a specific section by its ID with the provided parameters.
   * @param {string} boardId - The ID of the board the section belongs to.
   * @param {string} sectionId - The ID of the section to update.
   * @param {Object} params - The parameters to update the section with.
   * @returns {Promise} The server response.
   */
  update: (boardId, sectionId, params) => axiosClient.put(
    `boards/${boardId}/sections/${sectionId}`,
    params
  ),
  /**
   * Deletes a specific section by its ID.
   * @param {string} boardId - The ID of the board the section belongs to.
   * @param {string} sectionId - The ID of the section to delete.
   * @returns {Promise} The server response.
   */
  delete: (boardId, sectionId) => axiosClient.delete(`boards/${boardId}/sections/${sectionId}`)
}

export default sectionApi
