class CustomAPIError extends Error {
  constructor(msg, code) {
    super(msg)
    this.statusCode = code
  }
}

module.exports = CustomAPIError
