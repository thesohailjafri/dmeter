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

const apiRouter = (app) => {
  app.get('/', (_, res) => res.send('Dmeter'))
  app.use('/api/auth/', authRouter)
  app.use('/api/search/', searchRouter)
  app.use('/api/restaurant/', restaurantRouter)
  app.use('/api/menu/', menuRouter)
  app.use('/api/order/', orderRouter)
  app.use('/api/branch/', branchRouter)
  app.use('/api/staff/', authUserMiddleware, staffRouter)

  // post m.w
  app.use(notFoundMiddleware)
  app.use(errorHandlerMiddleware)
}

module.exports = apiRouter
