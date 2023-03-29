const express = require('express')
const {
  registerRestaurant,
  getRestaurantUsingSlug,
  getRestaurants,
} = require('../controllers/restaurantController')
const restaurantRouter = express.Router()

restaurantRouter.route('/').post(registerRestaurant).get(getRestaurants)
restaurantRouter.route('/slug/:slug').get(getRestaurantUsingSlug)

module.exports = restaurantRouter
