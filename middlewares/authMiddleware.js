const jwt = require('jsonwebtoken')
const error = require('../errors')
const {
  createTokenUser,
  createTokenCustomer,
} = require('../helpers/jwt/generate')

const authUserMiddleware = async (req, _, next) => {
  const bearerHeader = req.headers['authorization']
  if (!bearerHeader || bearerHeader.split(' ')[0] !== 'Bearer') {
    throw new error.UnauthorizedError('No token provided')
  }
  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]

  const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET)
  req.user = { ...createTokenUser(decoded, decoded.restaurant_name) }
  next()
}

const authCustomerMiddleware = async (req, _, next) => {
  const bearerHeader = req.headers['authorization']
  if (!bearerHeader || bearerHeader.split(' ')[0] !== 'Bearer') {
    throw new error.UnauthorizedError('No token provided')
  }

  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  if (!bearerToken || bearerToken === 'null') {
    throw new error.BadRequestError()
  }

  const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET)
  req.customer = { ...createTokenCustomer(decoded) }
  next()
}

module.exports = { authUserMiddleware, authCustomerMiddleware }
