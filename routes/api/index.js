const authUserRouter = require('../auth/authUserRouter')
const restuarantRegistrationRouter = require('../restuarantRegistrationRouter')
const apiRouter = (app) => {
  app.get('/', (_, res) => res.send('Dmeter'))
  app.use('/api/auth/user/', authUserRouter)
  app.use('/api/registration/', restuarantRegistrationRouter)
}

module.exports = apiRouter
