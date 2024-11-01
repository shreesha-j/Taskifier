/**
 * API endpoints for task-related operations.
 *
 * @module taskApi
 */

import axiosClient from './axiosClient'

/**
 * Creates a new task in a specific board.
 * @param {string} boardId - The ID of the board to create a task in.
 * @param {Object} params - The parameters to create the task with.
 * @returns {Promise} The server response.
 */
const create = (boardId, params) =>
  axiosClient.post(`boards/${boardId}/tasks`, params)

/**
 * Updates the position of tasks in a specific board.
 * @param {string} boardId - The ID of the board to update task positions in.
 * @param {Object} params - The parameters to update task positions with.
 * @returns {Promise} The server response.
 */
export default taskApi
