const express = require('express')
const {
  searchResturantAndBranches,
} = require('../controllers/searchController')
const searchRouter = express.Router()

searchRouter.route('/rnb/:keyword').get(searchResturantAndBranches)

module.exports = searchRouter
