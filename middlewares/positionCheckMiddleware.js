const error = require('../errors')

const positionCheckMiddleware = (...positions) => {
  return (req, _, next) => {
    if (!positions.includes(req.user.position)) {
      throw new error.UnauthorizedError(
        'Unauthorized role to access this operation',
      )
    }
    next()
  }
}
module.exports = positionCheckMiddleware
