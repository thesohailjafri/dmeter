const express = require('express')
const { registerRestaurant } = require('../controllers/restaurantController')
const authMiddleware = require('../middlewares/authMiddleware')
const restaurantRouter = express.Router()

restaurantRouter.route('/').post(registerRestaurant)

module.exports = restaurantRouter
