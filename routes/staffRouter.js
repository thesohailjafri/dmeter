const express = require('express')
const { deleteMenuCategory } = require('../controllers/menuController')
const {
  registerStaffMember,
  getStaffMembers,
  getAllStaffMembers,
  deleteStaffCategory,
} = require('../controllers/staffController')
const positionCheckMiddleware = require('../middlewares/positionCheckMiddleware')

const staffRouter = express.Router()

staffRouter.route('/').post(registerStaffMember).get(getAllStaffMembers)
staffRouter
  .route('/:id')
  .get(getStaffMembers)
  .delete(positionCheckMiddleware('owner', 'manager'), deleteStaffCategory)

module.exports = staffRouter
