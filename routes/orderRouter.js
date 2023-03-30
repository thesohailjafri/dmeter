const express = require('express')
const {
  postOrderManual,
  getOrders,
  updateOrder,
  getOrder,
} = require('../controllers/orderController')
const { authUserMiddleware } = require('../middlewares/authMiddleware')
const orderRouter = express.Router()

orderRouter
  .route('/')
  .post(authUserMiddleware, postOrderManual)
  .get(authUserMiddleware, getOrders)
orderRouter
  .route('/:id')
  .get(authUserMiddleware, getOrder)
  .patch(authUserMiddleware, updateOrder)
module.exports = orderRouter
