const express = require('express')
const { postOrderManual, getOrders } = require('../controllers/orderController')
const authMiddleware = require('../middlewares/authMiddleware')
const orderRouter = express.Router()

orderRouter
  .route('/')
  .post(authMiddleware, postOrderManual)
  .get(authMiddleware, getOrders)

module.exports = orderRouter
