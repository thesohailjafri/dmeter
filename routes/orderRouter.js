const express = require('express')
const { postOrderManual, getOrders } = require('../controllers/orderController')
const { authUserMiddleware } = require('../middlewares/authMiddleware')
const orderRouter = express.Router()

orderRouter
  .route('/')
  .post(authUserMiddleware, postOrderManual)
  .get(authUserMiddleware, getOrders)

module.exports = orderRouter
