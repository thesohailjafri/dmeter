const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message,
  }

  if (err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg =
      `${Object.keys(err.keyValue).join(', ')} ${
        Object.keys.length > 1 ? ' combination' : ''
      } already exist` || 'Bad Request'
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    customError.statusCode = StatusCodes.UNAUTHORIZED
    customError.msg = err.name
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg,
  })
}

module.exports = errorHandlerMiddleware
