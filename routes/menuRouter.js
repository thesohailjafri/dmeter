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
const { authUserMiddleware } = require('../middlewares/authMiddleware')
var urlencodedParser = bodyParser.json()

const menuRouter = express.Router()

menuRouter
  .route('/')
  .post(authUserMiddleware, urlencodedParser, postMenuitem)
  .get(getMenu)

menuRouter
  .route('/category')
  .post(authUserMiddleware, postMenuCategory)
  .get(getMenuCategories)

menuRouter.route('/category/:id').delete(authUserMiddleware, deleteMenuCategory)

menuRouter
  .route('/:id')
  .get(getMenuitem)
  .delete(authUserMiddleware, deleteMenuitem)

module.exports = menuRouter
