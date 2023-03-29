const express = require('express')
const {
  updateCustomerCart,
  getCustomerCart,
} = require('../controllers/customerController')
const { authCustomerMiddleware } = require('../middlewares/authMiddleware')
const customerRouter = express.Router()

customerRouter
  .route('/cart')
  .get(authCustomerMiddleware, getCustomerCart)
  .post(authCustomerMiddleware, updateCustomerCart)

module.exports = customerRouter
