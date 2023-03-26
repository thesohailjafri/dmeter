const express = require('express')
const {
  registerBranch,
  getBranches,
  getBranch,
  getBranchMenuitems,
  getBranchUsingSlug,
} = require('../controllers/branchController')
const { authUserMiddleware } = require('../middlewares/authMiddleware')
const positionCheckMiddleware = require('../middlewares/positionCheckMiddleware')

const branchRouter = express.Router()

branchRouter
  .route('/')
  .post(authUserMiddleware, registerBranch)
  .get(getBranches)

branchRouter.route('/menu/:id').get(getBranchMenuitems)
branchRouter.route('/slug/:slug').get(getBranchUsingSlug)
branchRouter.route('/:id').get(getBranch)

module.exports = branchRouter
