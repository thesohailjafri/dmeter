const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class NotFoundError extends CustomAPIError {
  constructor(msg) {
    super(msg)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

module.exports = NotFoundError
