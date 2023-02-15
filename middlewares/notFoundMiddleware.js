const notFoundMiddleware = (req, res) =>
  res.status(404).json({
    msg: 'API route does not exist',
  })

module.exports = notFoundMiddleware
