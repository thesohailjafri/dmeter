const express = require('express')
const {
  registerBranch,
  getBranches,
  getBranch,
  getBranchMenuitems,
} = require('../controllers/branchController')
const positionCheckMiddleware = require('../middlewares/positionCheckMiddleware')

const branchRouter = express.Router()

branchRouter
  .route('/')
  .post(registerBranch)
  .get(positionCheckMiddleware('owner'), getBranches)

branchRouter.route('/:id').get(getBranch)
branchRouter.route('/menu/:id').get(getBranchMenuitems)

module.exports = branchRouter
