const path = require('path')
const buildPathMiddleware = require('express').Router()
const buildPath = path.normalize(
  path.join(__dirname, '..', process.env.RENDER_BUILD, 'index.html'),
)

buildPathMiddleware.get('*', async (req, res, next) => {
  res.sendFile(path.join(buildPath))
})

module.exports = buildPathMiddleware
