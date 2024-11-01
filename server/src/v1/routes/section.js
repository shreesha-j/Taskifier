/**
 * Section routes.
 *
 * These routes are responsible for handling section-related operations.
 */

const router = require('express').Router({ mergeParams: true })
const { param } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const sectionController = require('../controllers/section')
const validation = require('../handlers/validation')

/**
 * Create a new section.
 *
 * This route is responsible for creating a new section within a board.
 * The route is protected by token authentication.
 */
router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.create
)

/**
 * Update a section.
 *
 * This route is responsible for updating a section within a board.
 * The route is protected by token authentication.
 */
router.put(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.update
)

/**
 * Delete a section.
 *
 * This route is responsible for deleting a section within a board.
 * The route is protected by token authentication.
 */
router.delete(
  '/:sectionId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('sectionId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid section id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.delete
)

module.exports = router
