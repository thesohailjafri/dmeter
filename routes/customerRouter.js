const express = require('express')
const { customerCartOperation } = require('../controllers/customerController')
const { authCustomerMiddleware } = require('../middlewares/authMiddleware')
const customerRouter = express.Router()

customerRouter
  .route('/cart')
  .post(authCustomerMiddleware, customerCartOperation)

module.exports = customerRouter
