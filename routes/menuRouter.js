const express = require('express')
var bodyParser = require('body-parser')
const {
  postMenuitem,
  getMenu,
  getMenuitem,
  postMenuCategory,
  getMenuCategories,
  deleteMenuitem,
  deleteMenuCategory,
} = require('../controllers/menuController')
const authMiddleware = require('../middlewares/authMiddleware')
var urlencodedParser = bodyParser.json()

const menuRouter = express.Router()

menuRouter
  .route('/')
  .post(authMiddleware, urlencodedParser, postMenuitem)
  .get(getMenu)

menuRouter
  .route('/category')
  .post(authMiddleware, postMenuCategory)
  .get(getMenuCategories)

menuRouter.route('/category/:id').delete(authMiddleware, deleteMenuCategory)

menuRouter.route('/:id').get(getMenuitem).delete(authMiddleware, deleteMenuitem)

module.exports = menuRouter
