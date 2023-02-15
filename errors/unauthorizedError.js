const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class UnauthorizedError extends CustomAPIError {
  constructor(msg) {
    super(msg)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnauthorizedError
