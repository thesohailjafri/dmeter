const buildPathMiddleware = require('../middlewares/buildPathMiddleware')
const restaurantRouter = require('./restaurantRouter')
const branchRouter = require('./branchRouter')
const staffRouter = require('./staffRouter')
const menuRouter = require('./menuRouter')
const authRouter = require('./authRouter')
const notFoundMiddleware = require('../middlewares/notFoundMiddleware')
const errorHandlerMiddleware = require('../middlewares/errorHandlerMiddleware')
const { authUserMiddleware } = require('../middlewares/authMiddleware')
const orderRouter = require('./orderRouter')
const searchRouter = require('./searchRouter')
const express = require('express'),
  path = require('path'),
  buildPath = path.normalize(
    path.join(__dirname, '..', process.env.RENDER_BUILD),
  )
const apiRouter = (app) => {
  app.use('/', express.static(buildPath))
  app.use('/api/auth/', authRouter)
  app.use('/api/search/', searchRouter)
  app.use('/api/restaurant/', restaurantRouter)
  app.use('/api/menu/', menuRouter)
  app.use('/api/order/', orderRouter)
  app.use('/api/branch/', branchRouter)
  app.use('/api/staff/', authUserMiddleware, staffRouter)

  // post m.w
  app.use(buildPathMiddleware)
  app.use(notFoundMiddleware)
  app.use(errorHandlerMiddleware)
}

module.exports = apiRouter
