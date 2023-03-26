const express = require('express')
const { registerRestaurant } = require('../controllers/restaurantController')
const restaurantRouter = express.Router()

restaurantRouter.route('/').post(registerRestaurant)

module.exports = restaurantRouter
