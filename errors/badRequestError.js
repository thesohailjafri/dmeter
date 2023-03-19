const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customError')

class BadRequestError extends CustomAPIError {
  constructor(msg = 'Bad Request') {
    super(msg)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequestError
