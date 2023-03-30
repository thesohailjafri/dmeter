const express = require('express')
const {
  updateCustomerCart,
  getCustomerCart,
} = require('../controllers/customerController')
const { postOrderCustomer } = require('../controllers/orderController')
const { authCustomerMiddleware } = require('../middlewares/authMiddleware')
const customerRouter = express.Router()

customerRouter
  .route('/cart')
  .get(authCustomerMiddleware, getCustomerCart)
  .post(authCustomerMiddleware, updateCustomerCart)

customerRouter.route('/order').post(authCustomerMiddleware, postOrderCustomer)

module.exports = customerRouter
